import { Codex } from './codex';
import { SimulationResults, SimulationStep, BridgeEvent, BridgeSummary, BridgeFamilyStats, TelosParams } from '../types';
import { SeededRandom } from './random';
import { isKernel, AgentContext } from './proposals/agents';
import { buildProposalFrontier } from './proposals/frontier';
import { rankProposals } from './proposals/rank';
import { selectProposal } from './proposals/select';
import { createTieBreakContext } from './benchmarks/reproducibility';

export class Telos {
  private codex: Codex;
  private params: TelosParams;
  private rng: { next: () => number };

  constructor(codex: Codex, params?: Partial<TelosParams>) {
    this.codex = codex;
    this.params = {
      alpha: 0.5,
      beta: 0.1,
      gamma: 0.3,
      delta: 0.2,
      lambda: 0.618,
      eta: 0.3,
      epsilon: 0.05,
      threshold: 0.8,
      observerPersistence: 2,
      temperature: 1.0,
      maxSequenceLength: 10,
      architectureMode: 'stratified',
      ...params
    };

    // [SEED-DEPENDENT BEHAVIOR]
    // RNG initialization determines the determinism of the entire simulation.
    if (this.params.seed !== undefined) {
      const seeded = new SeededRandom(this.params.seed);
      this.rng = { next: () => seeded.next() };
    } else {
      this.rng = { next: () => Math.random() };
    }
  }

  public information(seq: string[]): number {
    if (seq.length === 0) return 0;
    
    // 1. Symbol Entropy (Unigram)
    const counts = new Map<string, number>();
    seq.forEach(s => counts.set(s, (counts.get(s) || 0) + 1));
    const probs = Array.from(counts.values()).map(v => v / seq.length);
    const unigramH = -probs.reduce((acc, p) => acc + p * Math.log(p + 1e-9), 0);

    // 2. Transition Entropy (Bigram) - Order Sensitive
    if (seq.length < 2) return unigramH;
    const bigramCounts = new Map<string, number>();
    for (let i = 0; i < seq.length - 1; i++) {
      const bigram = `${seq[i]}|${seq[i+1]}`;
      bigramCounts.set(bigram, (bigramCounts.get(bigram) || 0) + 1);
    }
    const bigramProbs = Array.from(bigramCounts.values()).map(v => v / (seq.length - 1));
    const bigramH = -bigramProbs.reduce((acc, p) => acc + p * Math.log(p + 1e-9), 0);

    // Weighted combination: 70% unigram, 30% bigram
    return (unigramH * 0.7) + (bigramH * 0.3);
  }

  public coherence(seq: string[]): number {
    if (seq.length === 0) return 0;
    
    // 1. Inventory Coherence (Order Insensitive)
    const distinct = new Set(seq).size;
    const total = this.codex.symbols.symbols.length;
    const invPhi = 1.0 - (distinct / total);

    // 2. Transition Coherence (Order Sensitive)
    if (seq.length < 2) return invPhi;
    let transScore = 0;
    for (let i = 0; i < seq.length - 1; i++) {
      const s1 = this.codex.getSymbol(seq[i]);
      const s2 = this.codex.getSymbol(seq[i+1]);
      if (!s1 || !s2) continue;

      if (s1.domain === s2.domain) {
        transScore += 1.0;
      } else {
        // Check for bridges
        const hasBridge = this.codex.symbols.cross_domain_bridges.some(b => 
          (b.from === s1.domain && b.to === s2.domain) || 
          (b.from === s2.domain && b.to === s1.domain)
        );
        if (hasBridge) transScore += 0.8;
      }
    }
    const transPhi = transScore / (seq.length - 1);

    // Weighted combination: 40% inventory, 60% transition
    return (invPhi * 0.4) + (transPhi * 0.6);
  }

  public energy(seq: string[]): number {
    const counts = new Map<string, number>();
    return seq.reduce((acc, s) => {
      const count = (counts.get(s) || 0) + 1;
      counts.set(s, count);
      const weight = this.codex.getSymbol(s)?.weight || 0;
      // Diminishing returns for repeated symbols: 1.0, 0.8, 0.64, 0.51...
      return acc + weight * Math.pow(0.8, count - 1);
    }, 0);
  }

  public complexity(seq: string[]): number {
    return seq.length;
  }

  /**
   * Task 5: Expose score components
   */
  public computeTelicScore(seq: string[]): {
    info: number;
    coherence: number;
    energy: number;
    complexityPenalty: number;
    total: number;
  } {
    const I = this.information(seq);
    const Phi = this.coherence(seq);
    const E = this.energy(seq);
    const K = this.complexity(seq);
    
    const infoPart = this.params.alpha * I;
    const coherencePart = this.params.gamma * Phi;
    const energyPart = this.params.delta * E;
    
    // Task 1: Strengthen complexity cost
    // Piecewise quadratic penalty after length 10
    const penalizedK = K <= 10 ? K : 10 + Math.pow(K - 10, 2);
    const complexityPart = -this.params.beta * penalizedK;
    
    const couplingTerm = 0.2 * (I * Phi); 
    
    const total = infoPart + coherencePart + energyPart + complexityPart + couplingTerm;
    
    return {
      info: infoPart,
      coherence: coherencePart,
      energy: energyPart,
      complexityPenalty: complexityPart,
      total
    };
  }

  public telicScore(seq: string[]): number {
    return this.computeTelicScore(seq).total;
  }

  /**
   * V9 Algebraic Core: Telic Curvature Bridge
   * κ_telic = κ_Ollivier (1 + λΔT)
   */
  public computeTelicCurvature(seq: string[], prevScore: number): number {
    const kOllivier = this.coherence(seq);
    const tCurrent = this.telicScore(seq);
    const deltaT = tCurrent - prevScore;
    return kOllivier * (1 + this.params.lambda * deltaT);
  }

  /**
   * V9 Algebraic Core: Duality Update Equation
   * Dₜ₊₁ = Dₜ + λCₜ + ηNₜ + ε
   * Refactored: Instead of pure accumulation, we use a moving average
   * that is DRIVEN by the V9 update term, ensuring it stays anchored to quality.
   */
  private updateDuality(prevDuality: number, seq: string[]): number {
    const C = this.coherence(seq);
    const N = this.information(seq);
    const rawD = this.computeRawDuality(seq);
    
    // The V9 "Force" term
    const force = (this.params.lambda * C) + (this.params.eta * N) + this.params.epsilon;
    
    // Target duality is the raw duality boosted by the telic force
    const targetD = Math.min(1.0, rawD * (1 + force * 0.2));
    
    // Smooth transition towards target
    const nextD = prevDuality + (targetD - prevDuality) * 0.2;
    
    return Math.max(0, Math.min(1.0, nextD));
  }

  /**
   * Task 1: Fix duality definition
   * A single raw duality measure calculated directly from the sequence.
   * Interpretable as "current sequence duality/coherence/tension level".
   * Bounded in [0, 1].
   */
  public computeRawDuality(seq: string[]): number {
    if (seq.length === 0) return 0;
    
    // 1. Energy Factor (Normalized Average Weight)
    const weights = seq.map(s => this.codex.getSymbol(s)?.weight || 0);
    const energy = (weights.reduce((a, b) => a + b, 0) / seq.length) / 100.0;
    
    // 2. Diversity Factor (Normalized Entropy)
    const I = this.information(seq);
    const maxI = Math.log(Math.max(seq.length, 2));
    const diversity = (I + 0.01) / (maxI + 0.01);
    
    // 3. Coherence Factor (Semantic Alignment)
    const Phi = this.coherence(seq);
    
    // 4. Synergistic Product
    const synergy = energy * diversity * Phi;
    
    return Math.max(0, Math.min(1.0, synergy));
  }

  public duality(seq: string[]): number {
    return this.computeRawDuality(seq);
  }

  private getInventoryKey(seq: string[]): string {
    const counts = new Map<string, number>();
    seq.forEach(s => counts.set(s, (counts.get(s) || 0) + 1));
    const sortedKeys = Array.from(counts.keys()).sort();
    return sortedKeys.map(k => `${k}:${counts.get(k)}`).join('|');
  }

  private isInventoryChanged(seqA: string[], seqB: string[]): boolean {
    return this.getInventoryKey(seqA) !== this.getInventoryKey(seqB);
  }

  private isOrderChanged(seqA: string[], seqB: string[]): boolean {
    if (seqA.length !== seqB.length) return true;
    return seqA.join('|') !== seqB.join('|');
  }

  private getAgentContext(): AgentContext {
    return {
      codex: this.codex,
      rng: this.rng,
      maxSequenceLength: this.params.maxSequenceLength
    };
  }

  private computeKernelPurity(seq: string[]): number {
    if (seq.length === 0) return 0;
    const kernelCount = seq.filter(s => isKernel(s)).length;
    return kernelCount / seq.length;
  }

  private computeBridgeActivation(seq: string[]): number {
    if (seq.length < 2) return 0;
    let bridgeCount = 0;
    for (let i = 0; i < seq.length - 1; i++) {
      const s1 = this.codex.getSymbol(seq[i]);
      const s2 = this.codex.getSymbol(seq[i+1]);
      if (!s1 || !s2) continue;
      if (s1.domain !== s2.domain) {
        const hasBridge = this.codex.symbols.cross_domain_bridges.some(b => 
          (b.from === s1.domain && b.to === s2.domain) || 
          (b.from === s2.domain && b.to === s1.domain)
        );
        if (hasBridge) bridgeCount++;
      }
    }
    return bridgeCount / (seq.length - 1);
  }

  private getBridgeEvents(
    seq: string[], 
    agent: string, 
    proposalType: string, 
    deltaScore: number, 
    deltaCoherence: number, 
    deltaDuality: number, 
    accepted: boolean,
    kernelPurityChange: number = 0,
    kernelDivergenceChange: number = 0,
    leakageStayedFalse: boolean = true
  ): BridgeEvent[] {
    if (seq.length < 2) return [];
    const events: BridgeEvent[] = [];
    for (let i = 0; i < seq.length - 1; i++) {
      const s1 = this.codex.getSymbol(seq[i]);
      const s2 = this.codex.getSymbol(seq[i+1]);
      if (!s1 || !s2) continue;
      if (s1.domain !== s2.domain) {
        const bridge = this.codex.symbols.cross_domain_bridges.find(b => 
          (b.from === s1.domain && b.to === s2.domain) || 
          (b.from === s2.domain && b.to === s1.domain)
        );
        if (bridge) {
          events.push({
            bridgeKey: `${s1.domain}->${s2.domain}`,
            fromSymbol: s1.glyph,
            toSymbol: s2.glyph,
            fromDomain: s1.domain,
            toDomain: s2.domain,
            agent,
            proposalType,
            deltaScore,
            deltaCoherence,
            deltaDuality,
            accepted,
            kernelPurityChange,
            kernelDivergenceChange,
            leakageStayedFalse
          });
        }
      }
    }
    return events;
  }


  /**
   * [ORCHESTRATION / SIMULATION LOOP]
   */
  public evolveStep(seq: string[], step: number, dHist: number[], currentTemp: number, prevSmoothedDuality: number, prevStep?: SimulationStep): { 
    nextSeq: string[], 
    dNew: number, 
    rawD: number,
    tScore: number,
    proposalType: string,
    accepted: boolean,
    deltaScore: number,
    inventoryChanged: boolean,
    orderChanged: boolean,
    scoreBreakdown: any,
    selectionMetadata: SimulationStep['selectionMetadata'],
    metrics: Partial<SimulationStep>
  } {
    // [DETERMINISM BOUNDARY] 
    // Orchestration of proposal generation, ranking, and selection.
    // 1. [CANDIDATE FRONTIER BUILDING]
    const frontier = buildProposalFrontier(seq, step, {
      ...this.getAgentContext(),
      architectureMode: this.params.architectureMode
    });

    // 2. [CANDIDATE RANKING / EVALUATION]
    const ranked = rankProposals(frontier, this);
    
    // 3. [PROPOSAL SELECTION]
    const selection = selectProposal({
      ranked,
      currentTemp,
      tieBreakContext: createTieBreakContext(this.params.seed || 0, step, seq)
    }, this.rng);
    const proposal = selection.selected;
    const accepted = selection.accepted;
    
    // [PHASE 2: SELECTION METADATA]
    const selectionMetadata = {
      tieBreakApplied: selection.tieBreakApplied,
      originalIndex: selection.originalIndex,
      stableIndex: selection.stableIndex
    };
    
    // 4. [STATE EVOLUTION]
    const nextSeq = accepted ? proposal.sequence : seq;
    const tScore = accepted ? proposal.score : this.telicScore(seq);
    const rawD = this.computeRawDuality(nextSeq);
    const dNew = this.updateDuality(prevSmoothedDuality, nextSeq);

    // 5. [METRICS & INSTRUMENTATION]
    const inventoryChanged = this.isInventoryChanged(nextSeq, seq);
    const orderChanged = this.isOrderChanged(nextSeq, seq);
    const scoreBreakdown = this.computeTelicScore(nextSeq);

    // Phase 5 Metrics for Bridge Summary
    const currentKernelPurity = this.computeKernelPurity(seq);
    const candidateKernelPurity = this.computeKernelPurity(proposal.sequence);
    const kernelPurityChange = candidateKernelPurity - currentKernelPurity;
    const kernelDivergenceChange = (1.0 - candidateKernelPurity) - (1.0 - currentKernelPurity);
    const leakageStayedFalse = candidateKernelPurity >= 0.3; // Threshold for leakage

    // Phase 5: Bridge Events Trace
    const currentRawD = this.computeRawDuality(seq);
    const currentPhi = this.coherence(seq);
    const deltaCoherence = proposal.coherence - currentPhi;
    const deltaDuality = proposal.rawDuality - currentRawD;
    
    const bridgeEvents = this.getBridgeEvents(
      nextSeq, 
      proposal.agent || 'Flat', 
      proposal.type, 
      proposal.deltaScore, 
      deltaCoherence, 
      deltaDuality, 
      accepted,
      kernelPurityChange,
      kernelDivergenceChange,
      leakageStayedFalse
    );

    // Phase 1 Metrics
    const kernelPurity = this.computeKernelPurity(nextSeq);
    const bridgeActivationRate = this.computeBridgeActivation(nextSeq);
    const telicScoreTrend = prevStep ? tScore - prevStep.telicScore : 0;
    const kernelDivergence = 1.0 - kernelPurity;
    const convergenceIndex = step / 100; // Simplified
    const invariantLeakageFlag = kernelPurity < 0.3; // Example threshold

    // Phase 3 Consensus (Simplified for now)
    const consensusScore = tScore * (1 - kernelDivergence * 0.5);
    const fracturePoints: number[] = [];
    for (let i = 0; i < nextSeq.length - 1; i++) {
      const s1 = this.codex.getSymbol(nextSeq[i]);
      const s2 = this.codex.getSymbol(nextSeq[i+1]);
      if (s1 && s2 && s1.domain !== s2.domain) {
        const hasBridge = this.codex.symbols.cross_domain_bridges.some(b => 
          (b.from === s1.domain && b.to === s2.domain) || 
          (b.from === s2.domain && b.to === s1.domain)
        );
        if (!hasBridge) fracturePoints.push(i);
      }
    }

    return { 
      nextSeq, 
      dNew, 
      rawD, 
      tScore, 
      proposalType: proposal.type, 
      accepted, 
      deltaScore: proposal.deltaScore, 
      inventoryChanged,
      orderChanged,
      scoreBreakdown,
      selectionMetadata,
      metrics: {
        kernelPurity,
        bridgeActivationRate,
        bridgeEvents,
        telicScoreTrend,
        kernelDivergence,
        convergenceIndex,
        invariantLeakageFlag,
        consensusScore,
        fracturePoints
      }
    };
  }

  /**
   * [ORCHESTRATION / SIMULATION LOOP]
   */
  public run(initialSeq: string[], steps: number = 30): SimulationResults {
    let current = [...initialSeq];
    const initialRawD = this.computeRawDuality(current);
    const initialScoreBreakdown = this.computeTelicScore(current);
    
    // Task 2: Make step 0 explicit as initialization
    const history: SimulationStep[] = [{
      sequence: [...current],
      rawDuality: initialRawD,
      duality: initialRawD, // Initial smoothed is raw
      telicScore: initialScoreBreakdown.total,
      step: 0,
      mod97: this.codex.mod97(current),
      adversarialPassed: this.codex.adversarialTest(current),
      compassMatch: this.codex.findCompassMatch(current),
      resilience: this.codex.resilience(current),
      telicCurvature: this.computeTelicCurvature(current, initialScoreBreakdown.total),
      pathIntegral: Math.exp(initialScoreBreakdown.total * 0.01), // Scaled for stability
      scoreInfo: initialScoreBreakdown.info,
      scoreCoherence: initialScoreBreakdown.coherence,
      scoreEnergy: initialScoreBreakdown.energy,
      scoreComplexityPenalty: initialScoreBreakdown.complexityPenalty,
      bestScoreSoFar: initialScoreBreakdown.total,
      proposalType: 'init',
      accepted: null,
      deltaScore: 0,
      inventoryChanged: false,
      orderChanged: false,
      kernelPurity: this.computeKernelPurity(current),
      bridgeActivationRate: this.computeBridgeActivation(current),
      telicScoreTrend: 0,
      kernelDivergence: 1.0 - this.computeKernelPurity(current),
      convergenceIndex: 0,
      invariantLeakageFlag: false,
      consensusScore: initialScoreBreakdown.total,
      fracturePoints: [],
      bridgeEvents: this.getBridgeEvents(current, 'System', 'init', 0, 0, 0, true),
      selectionMetadata: { tieBreakApplied: false }
    }];

    let observerEmerged = false;
    let observerStep: number | undefined;
    let persistenceCounter = 0;
    let inventoryChangedOccurred = false;
    const observerPersistence = this.params.observerPersistence || 1;

    // Task 4: Add run-level proposal counters
    const proposalStats = {
      counts: {} as Record<string, { 
        proposed: number; 
        accepted: number; 
        totalDelta: number; 
        rejectedNegative: number;
        acceptanceRate: number;
        meanDeltaScore: number;
      }>,
      totalProposed: 0,
      totalAccepted: 0,
      noneProposed: 0,
      acceptanceRateOverall: 0
    };

    const initStats = (type: string) => {
      if (!proposalStats.counts[type]) {
        proposalStats.counts[type] = { 
          proposed: 0, 
          accepted: 0, 
          totalDelta: 0, 
          rejectedNegative: 0,
          acceptanceRate: 0,
          meanDeltaScore: 0
        };
      }
    };

    for (let t = 1; t <= steps; t++) {
      const dHist = history.map(h => h.duality);
      const currentTemp = this.params.temperature * Math.pow(0.95, t);
      const prevStep = history[history.length - 1];
      const prevSmoothedDuality = prevStep.duality;
      
      const { 
        nextSeq, 
        dNew, 
        rawD, 
        tScore, 
        proposalType, 
        accepted, 
        deltaScore, 
        inventoryChanged,
        orderChanged,
        scoreBreakdown,
        selectionMetadata,
        metrics
      } = this.evolveStep(current, t, dHist, currentTemp, prevSmoothedDuality, prevStep);
      
      // Update stats
      if (proposalType !== 'none') {
        initStats(proposalType);
        proposalStats.counts[proposalType].proposed++;
        proposalStats.totalProposed++;
        if (accepted) {
          proposalStats.counts[proposalType].accepted++;
          proposalStats.totalAccepted++;
          proposalStats.counts[proposalType].totalDelta += deltaScore;
        } else if (deltaScore < 0) {
          proposalStats.counts[proposalType].rejectedNegative++;
        }
      } else {
        proposalStats.noneProposed++;
      }

      current = nextSeq;
      const bestScoreSoFar = Math.max(history[history.length - 1].bestScoreSoFar, tScore);

      history.push({
        sequence: [...current],
        rawDuality: rawD,
        duality: dNew,
        telicScore: tScore,
        step: t,
        mod97: this.codex.mod97(current),
        adversarialPassed: this.codex.adversarialTest(current),
        compassMatch: this.codex.findCompassMatch(current),
        resilience: this.codex.resilience(current),
        telicCurvature: this.computeTelicCurvature(current, history[history.length - 1].telicScore),
        pathIntegral: history[history.length - 1].pathIntegral + Math.exp(tScore * 0.01), // Scaled for stability
        proposalType,
        accepted,
        deltaScore,
        inventoryChanged,
        orderChanged,
        selectionMetadata,
        scoreInfo: scoreBreakdown.info,
        scoreCoherence: scoreBreakdown.coherence,
        scoreEnergy: scoreBreakdown.energy,
        scoreComplexityPenalty: scoreBreakdown.complexityPenalty,
        bestScoreSoFar,
        ...metrics
      } as SimulationStep);

      if (accepted) {
        if (inventoryChanged) inventoryChangedOccurred = true;
      }

      /**
       * Task 3: Fix observer emergence logic
       * Based on smoothed duality crossing threshold for persistence.
       * Requirements:
       * - duality >= threshold
       * - step > 0
       * - at least one accepted inventory-changing proposal has occurred earlier in the run
       */
      if (!observerEmerged && t > 0 && inventoryChangedOccurred) {
        if (dNew >= this.params.threshold) {
          persistenceCounter++;
          if (persistenceCounter >= observerPersistence) {
            observerEmerged = true;
            observerStep = t;
          }
        } else {
          persistenceCounter = 0;
        }
      }

      const unique = new Set(current);
      if (unique.size === 1 && (unique.has("🕯️") || unique.has("🕳️"))) {
        if (this.rng.next() > currentTemp) break;
      }
    }

    // Compute final stats
    proposalStats.acceptanceRateOverall = proposalStats.totalProposed > 0 
      ? proposalStats.totalAccepted / proposalStats.totalProposed 
      : 0;

    Object.keys(proposalStats.counts).forEach(type => {
      const s = proposalStats.counts[type];
      s.acceptanceRate = s.proposed > 0 ? s.accepted / s.proposed : 0;
      s.meanDeltaScore = s.accepted > 0 ? s.totalDelta / s.accepted : 0;
    });

    // Task 5: Improve plateau semantics without changing scoring
    const postMetrics = this.computePostRunMetrics(history);
    const bridgeSummary = this.computeBridgeSummary(history);

    return { 
      history, 
      observerEmerged, 
      observerStep,
      iterationsRun: history.length - 1,
      proposalStats,
      bridgeSummary,
      ...postMetrics
    } as SimulationResults;
  }

  private computePostRunMetrics(history: SimulationStep[]) {
    let bestScore = -Infinity;
    let bestScoreStep = 0;
    let plateauStartStep = 0;
    let lastInventoryChangeStep = 0;
    let lastOrderChangeStep = 0;
    let lastAcceptedChangeStep = 0;
    let lastMeaningfulAcceptedStep = 0;
    let lastAcceptedScore = -Infinity;

    for (let i = 0; i < history.length; i++) {
      const step = history[i];
      
      if (step.telicScore > bestScore) {
        bestScore = step.telicScore;
        bestScoreStep = step.step;
        plateauStartStep = step.step; // Reset plateau start when we find a new best
      }

      if (step.inventoryChanged) {
        lastInventoryChangeStep = step.step;
      }

      if (step.orderChanged) {
        lastOrderChangeStep = step.step;
      }

      if (step.accepted) {
        lastAcceptedChangeStep = step.step;
        
        // Meaningful: inventory changed OR score changed from previous accepted state
        if (step.inventoryChanged || Math.abs(step.telicScore - lastAcceptedScore) > 1e-6) {
          lastMeaningfulAcceptedStep = step.step;
        }
        lastAcceptedScore = step.telicScore;
      }
    }

    return {
      bestScoreStep,
      plateauStartStep,
      lastInventoryChangeStep,
      lastOrderChangeStep,
      lastAcceptedChangeStep,
      lastMeaningfulAcceptedStep
    };
  }

  private computeBridgeSummary(history: SimulationStep[]): BridgeSummary {
    const families: Record<string, BridgeFamilyStats> = {};

    history.forEach(step => {
      if (!step.bridgeEvents) return;

      step.bridgeEvents.forEach(event => {
        const key = event.bridgeKey;
        if (!families[key]) {
          families[key] = {
            proposed: 0,
            accepted: 0,
            rejected: 0,
            acceptanceRate: 0,
            meanAcceptedDeltaScore: 0,
            meanAcceptedDeltaCoherence: 0,
            meanAcceptedDeltaDuality: 0,
            meanRejectedDeltaScore: 0,
            meanRejectedDeltaCoherence: 0,
            meanRejectedDeltaDuality: 0,
            acceptedSafeRate: 0,
            meanKernelPurityChange: 0,
            meanKernelDivergenceChange: 0
          };
        }

        const stats = families[key];
        stats.proposed++;

        if (event.accepted) {
          stats.accepted++;
          stats.meanAcceptedDeltaScore += event.deltaScore;
          stats.meanAcceptedDeltaCoherence += event.deltaCoherence;
          stats.meanAcceptedDeltaDuality += event.deltaDuality;
          if (event.leakageStayedFalse) stats.acceptedSafeRate++;
          stats.meanKernelPurityChange += event.kernelPurityChange || 0;
          stats.meanKernelDivergenceChange += event.kernelDivergenceChange || 0;
        } else {
          stats.rejected++;
          stats.meanRejectedDeltaScore += event.deltaScore;
          stats.meanRejectedDeltaCoherence += event.deltaCoherence;
          stats.meanRejectedDeltaDuality += event.deltaDuality;
        }
      });
    });

    // Finalize means
    Object.values(families).forEach(stats => {
      stats.acceptanceRate = stats.proposed > 0 ? stats.accepted / stats.proposed : 0;
      
      if (stats.accepted > 0) {
        stats.meanAcceptedDeltaScore /= stats.accepted;
        stats.meanAcceptedDeltaCoherence /= stats.accepted;
        stats.meanAcceptedDeltaDuality /= stats.accepted;
        stats.acceptedSafeRate /= stats.accepted;
        stats.meanKernelPurityChange /= stats.accepted;
        stats.meanKernelDivergenceChange /= stats.accepted;
      }

      if (stats.rejected > 0) {
        stats.meanRejectedDeltaScore /= stats.rejected;
        stats.meanRejectedDeltaCoherence /= stats.rejected;
        stats.meanRejectedDeltaDuality /= stats.rejected;
      }
    });

    return { families };
  }
}
