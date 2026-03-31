// src/hooks/useSimulation.ts
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Telos } from '../logic/telos';
import { Metrics } from '../logic/metrics';
import { Codex } from '../logic/codex';
import { SimulationResults, MetricsData, SimulationRun, AIConfig, ChartDataPoint, TelosParams } from '../types';
import { transformToCompassRunRecord } from '../logic/export';
import { distillTextToSymbols } from '../services/aiService';

export function useSimulation() {
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

  const codex = useMemo(() => new Codex(), []);

  const addToHistory = useCallback((p: TelosParams, n: string[], res: SimulationResults) => {
    setHistory(prev => {
      const newEntry = {
        id: `run-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        seed: p.seed!,
        params: { ...p },
        narrative: [...n],
        summary: {
          telic: res.history[res.history.length - 1].telicScore,
          duality: res.history[res.history.length - 1].duality
        }
      };
      // Keep last 10 runs
      return [newEntry, ...prev].slice(0, 10);
    });
  }, []);

  const runSimulation = useCallback(() => {
    let currentSeed = params.seed;
    if (autoRandomize) {
      currentSeed = Math.floor(Math.random() * 1000000);
      setParams(prev => ({ ...prev, seed: currentSeed }));
    }
    const nextParams = { ...params, seed: currentSeed, steps: simSteps };
    const telos = new Telos(codex, nextParams);
    const simResults = telos.run(narrative, simSteps);
    setResults({ ...simResults, seed: currentSeed });
    setMetrics(Metrics.compute(narrative, simResults, codex));
    setCurrentStepIdx(0);
    setIsPlaying(true);
    addToHistory(nextParams, narrative, simResults);
  }, [codex, narrative, params, simSteps, autoRandomize, addToHistory]);

  const stepForward = useCallback(() => {
    if (results && currentStepIdx < results.history.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    }
  }, [results, currentStepIdx]);

  const stepBack = useCallback(() => {
    if (currentStepIdx > 0) setCurrentStepIdx(prev => prev - 1);
  }, [currentStepIdx]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const resetSimulation = useCallback(() => {
    runSimulation();
  }, [runSimulation]);

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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && results) {
      interval = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev >= results.history.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, results]);

  useEffect(() => {
    runSimulation();
  }, []);

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

  const clearNarrative = useCallback(() => {
    setNarrative([]);
    setResults(null);
    setMetrics(null);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, []);

  const handleRandomize = useCallback(() => {
    const allGlyphs = codex.symbols.symbols.map(s => s.glyph);
    const length = 3 + Math.floor(Math.random() * 5);
    const randomSeq = Array.from({ length }, () => allGlyphs[Math.floor(Math.random() * allGlyphs.length)]);
    const currentSeed = autoRandomize ? Math.floor(Math.random() * 1000000) : params.seed;
    const nextParams = { ...params, seed: currentSeed };
    
    setNarrative(randomSeq);
    setParams(nextParams);
    
    const telos = new Telos(codex, nextParams);
    const simResults = telos.run(randomSeq, simSteps);
    setResults({ ...simResults, seed: currentSeed });
    setMetrics(Metrics.compute(randomSeq, simResults, codex));
    setCurrentStepIdx(0);
    setIsPlaying(true);
    addToHistory(nextParams, randomSeq, simResults);
  }, [codex, params, simSteps, autoRandomize, addToHistory]);

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
    setResults(null);
    setMetrics(null);
    setCurrentStepIdx(0);
    setIsPlaying(false);
    
    const telos = new Telos(codex, defaultParams);
    const simResults = telos.run(defaultNarrative, simSteps);
    setResults({ ...simResults, seed: currentSeed });
    setMetrics(Metrics.compute(defaultNarrative, simResults, codex));
    setCurrentStepIdx(simResults.history.length - 1);
    addToHistory(defaultParams, defaultNarrative, simResults);
  }, [codex, simSteps, autoRandomize, params.seed, addToHistory]);

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

  const restoreFromHistory = useCallback((entry: any) => {
    setParams(entry.params);
    setNarrative(entry.narrative);
    setAutoRandomize(false); // Disable auto-randomize when restoring a specific run
    
    const telos = new Telos(codex, entry.params);
    const simResults = telos.run(entry.narrative, simSteps);
    setResults({ ...simResults, seed: entry.seed });
    setMetrics(Metrics.compute(entry.narrative, simResults, codex));
    setCurrentStepIdx(simResults.history.length - 1);
    setIsPlaying(false);
  }, [codex, simSteps]);

  const setSeed = useCallback((seed: number) => {
    setParams(prev => ({ ...prev, seed }));
    setAutoRandomize(false);
  }, []);

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
      const symbols = await distillTextToSymbols(inputText, codex.symbols.symbols, aiConfig);
      if (symbols.length > 0) {
        setNarrative(symbols);
        setDistillStatus("Running Telos simulation...");
        
        // Allow UI to update before heavy simulation
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const telos = new Telos(codex, nextParams);
        const simResults = telos.run(symbols, steps);
        const resultsWithText = { ...simResults, originalText: inputText, seed: currentSeed };
        
        // Reset step index BEFORE setting results to ensure playback starts at 0
        setCurrentStepIdx(0);
        setResults(resultsWithText);
        setMetrics(Metrics.compute(symbols, simResults, codex));
        setIsPlaying(true); // Auto-play after distillation
        setDistillStatus(""); // Clear status on success
        addToHistory(nextParams, symbols, simResults);
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
  }, [codex, params, autoRandomize, addToHistory]);

  return {
    codex,
    narrative, params, results, metrics, simSteps, currentStepIdx, isPlaying,
    chartData, history, isDistilling, distillStatus,
    setNarrative, setParams, setSimSteps,
    setResults, setMetrics, setCurrentStepIdx, setIsPlaying,
    runSimulation, stepForward, stepBack, togglePlay, resetSimulation, handleExport,
    clearNarrative, handleRandomize, handleHardReset, addSymbol, removeSymbol,
    autoRandomize, setAutoRandomize, restoreFromHistory, addToHistory, setSeed,
    runDistillationFromText
  };
}
