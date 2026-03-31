// src/hooks/useSimulation.ts
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Telos } from '../logic/telos';
import { Metrics } from '../logic/metrics';
import { Codex } from '../logic/codex';
import { SimulationResults, MetricsData, SimulationRun, AIConfig, ChartDataPoint, TelosParams } from '../types';
import { transformToCompassRunRecord } from '../logic/export';
import { distillTextToSymbols } from '../services/aiService';

export function useSimulation() {
  // --- 1. State Declarations ---
  const [narrative, setNarrative] = useState<string[]>(["🌪️", "🐋", "🎯", "⚓", "💀"]);
  const [params, setParams] = useState<TelosParams>({
    alpha: 0.5, beta: 0.1, gamma: 0.3, delta: 0.2, lambda: 0.618,
    eta: 0.3, epsilon: 0.05, threshold: 0.8, temperature: 1.0,
    maxSequenceLength: 10, architectureMode: 'stratified', seed: Math.floor(Math.random() * 1000000)
  });
  const [autoRandomize, setAutoRandomize] = useState(false);
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [simSteps, setSimSteps] = useState(60);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [history, setHistory] = useState<SimulationRun[]>([]);
  const [isDistilling, setIsDistilling] = useState(false);
  const [distillStatus, setDistillStatus] = useState("");

  // --- 2. Derived Values ---
  const codex = useMemo(() => new Codex(), []);

  const chartData = useMemo<ChartDataPoint[]>(() => {
    if (!results) return [];
    return results.history.map(h => ({
      step: h.step,
      telic: parseFloat(h.telicScore.toFixed(4)),
      duality: parseFloat(h.duality.toFixed(4)),
      curvature: parseFloat(h.telicCurvature.toFixed(4)),
      length: h.sequence.length
    }));
  }, [results]);

  // --- 3. Internal Helpers ---
  const addToHistory = useCallback((params: TelosParams, narrative: string[], results: SimulationResults) => {
    const lastStep = results.history[results.history.length - 1];
    
    const newEntry: SimulationRun = {
      id: `run-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      seed: params.seed!,
      params: { ...params },
      narrative: [...narrative],
      summary: {
        telic: lastStep.telicScore,
        duality: lastStep.duality
      }
    };

    setHistory(prev => [newEntry, ...prev].slice(0, 10));
  }, []);

  const executeSimulation = useCallback((
    targetNarrative: string[],
    targetParams: TelosParams,
    targetSteps: number,
    options: {
      shouldAddToHistory?: boolean;
      originalText?: string;
      startAtEnd?: boolean;
      autoPlay?: boolean;
    } = {}
  ) => {
    const { 
      shouldAddToHistory = true, 
      originalText, 
      startAtEnd = false, 
      autoPlay = true 
    } = options;

    const telos = new Telos(codex, targetParams);
    const simResults = telos.run(targetNarrative, targetSteps);
    
    const finalResults: SimulationResults = { 
      ...simResults, 
      seed: targetParams.seed,
      originalText 
    };

    setResults(finalResults);
    setMetrics(Metrics.compute(targetNarrative, simResults, codex));
    
    const initialStep = startAtEnd ? simResults.history.length - 1 : 0;
    setCurrentStepIdx(initialStep);
    setIsPlaying(autoPlay);

    if (shouldAddToHistory) {
      addToHistory(targetParams, targetNarrative, simResults);
    }

    return simResults;
  }, [codex, addToHistory]);

  // --- 4. Simulation Execution Actions ---
  const runSimulation = useCallback(() => {
    let currentSeed = params.seed;
    if (autoRandomize) {
      currentSeed = Math.floor(Math.random() * 1000000);
      setParams(prev => ({ ...prev, seed: currentSeed }));
    }
    const nextParams = { ...params, seed: currentSeed };
    executeSimulation(narrative, nextParams, simSteps);
  }, [narrative, params, simSteps, autoRandomize, executeSimulation]);

  const handleRandomize = useCallback(() => {
    const allGlyphs = codex.symbols.symbols.map(s => s.glyph);
    const length = 3 + Math.floor(Math.random() * 5);
    const randomSeq = Array.from({ length }, () => allGlyphs[Math.floor(Math.random() * allGlyphs.length)]);
    const currentSeed = autoRandomize ? Math.floor(Math.random() * 1000000) : params.seed;
    const nextParams = { ...params, seed: currentSeed };
    
    setNarrative(randomSeq);
    setParams(nextParams);
    
    executeSimulation(randomSeq, nextParams, simSteps);
  }, [codex, params, simSteps, autoRandomize, executeSimulation]);

  const handleHardReset = useCallback(() => {
    const defaultNarrative = ["🌪️", "🐋", "🎯", "⚓", "💀"];
    const currentSeed = autoRandomize ? Math.floor(Math.random() * 1000000) : params.seed;
    const defaultParams: TelosParams = {
      alpha: 0.5, beta: 0.1, gamma: 0.3, delta: 0.2, lambda: 0.618,
      eta: 0.3, epsilon: 0.05, threshold: 0.8, temperature: 1.0,
      maxSequenceLength: 10, architectureMode: 'stratified', seed: currentSeed
    };
    
    setNarrative(defaultNarrative);
    setParams(defaultParams);
    
    executeSimulation(defaultNarrative, defaultParams, simSteps, { startAtEnd: true, autoPlay: false });
  }, [simSteps, autoRandomize, params.seed, executeSimulation]);

  const restoreFromHistory = useCallback((entry: SimulationRun) => {
    setParams(entry.params);
    setNarrative(entry.narrative);
    setAutoRandomize(false); // Disable auto-randomize when restoring a specific run
    
    executeSimulation(entry.narrative, entry.params, simSteps, { shouldAddToHistory: false, startAtEnd: true, autoPlay: false });
  }, [simSteps, executeSimulation]);

  const setSeed = useCallback((seed: number) => {
    setParams(prev => ({ ...prev, seed }));
    setAutoRandomize(false);
  }, []);

  const handleExport = useCallback(() => {
    if (!results) return;
    
    const record = transformToCompassRunRecord(
      results,
      params,
      metrics,
      narrative,
      results.originalText
    );

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(record, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `compass_run_${record.metadata.runId}.json`;
    a.click();
  }, [results, params, metrics, narrative]);

  // --- 5. Playback Actions ---
  useEffect(() => {
    if (!isPlaying || !results) return;

    const interval = setInterval(() => {
      setCurrentStepIdx(prev => {
        const isAtEnd = prev >= results.history.length - 1;
        if (isAtEnd) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, results]);

  // --- 6. Narrative Editing Actions ---
  const clearNarrative = useCallback(() => {
    setNarrative([]);
    setResults(null);
    setMetrics(null);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, []);

  const addSymbol = useCallback((glyph: string) => {
    if (narrative.length < params.maxSequenceLength) {
      setNarrative(prev => [...prev, glyph]);
    }
  }, [narrative, params.maxSequenceLength]);

  const removeSymbol = useCallback((index: number) => {
    setNarrative(prev => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  }, []);

  // --- 7. Distillation Actions ---
  const runDistillationFromText = useCallback(async (inputText: string, aiConfig: AIConfig, steps: number) => {
    if (!inputText.trim()) return;
    if (!aiConfig.apiKey) {
      setDistillStatus("Add your API key to enable AI features");
      setTimeout(() => setDistillStatus(""), 3000);
      return;
    }

    setIsDistilling(true);
    setDistillStatus(`Distilling semantic essence via ${aiConfig.provider}...`);
    setResults(null);
    setCurrentStepIdx(0);
    setIsPlaying(false);
    
    const currentSeed = autoRandomize ? Math.floor(Math.random() * 1000000) : params.seed;
    const nextParams = { ...params, seed: currentSeed };
    setParams(nextParams);
    
    try {
      const distillationConfig = { ...aiConfig, seed: currentSeed };
      const result = await distillTextToSymbols(inputText, codex.symbols.symbols, distillationConfig);
      
      if (result.symbols.length > 0) {
        setNarrative(result.symbols);
        setDistillStatus("Running Telos simulation...");
        
        // Allow UI to update before heavy simulation
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const simResults = executeSimulation(result.symbols, nextParams, steps, { originalText: inputText });
        
        // Attach AI diagnostic if available
        if (result.diagnostic && simResults) {
          setResults(prev => prev ? {
            ...prev,
            aiDiagnostics: [result.diagnostic!, ...(prev.aiDiagnostics || [])]
          } : null);
        }
        
        setDistillStatus(""); // Clear status on success
      } else {
        setDistillStatus("No symbols found. Try a different passage.");
        setTimeout(() => setDistillStatus(""), 3000);
      }
    } catch (error: any) {
      console.error("Distillation error:", error);
      setDistillStatus(error.message || "Error during distillation.");
      setTimeout(() => setDistillStatus(""), 5000);
    } finally {
      setIsDistilling(false);
    }
  }, [codex, params, autoRandomize, executeSimulation]);

  // --- 8. Lifecycle Effects ---
  // Bootstrap: Run initial simulation on mount
  useEffect(() => {
    runSimulation();
  }, []);

  // --- 9. Returned API ---
  return {
    codex,
    narrative, params, results, metrics, simSteps, currentStepIdx, isPlaying,
    chartData, history, isDistilling, distillStatus,
    setParams, setSimSteps,
    setCurrentStepIdx, setIsPlaying,
    runSimulation, handleExport,
    clearNarrative, handleRandomize, handleHardReset, addSymbol, removeSymbol,
    autoRandomize, setAutoRandomize, restoreFromHistory, setSeed,
    runDistillationFromText
  };
}
