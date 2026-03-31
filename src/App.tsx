/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { 
  Activity, Database, Zap, Shield, Target, Compass as CompassIcon, Anchor,
  ChevronRight, Play, RefreshCw, Info, Settings2, BarChart3,
  Layers, Triangle as TriangleIcon, Workflow, CheckCircle2,
  Lightbulb, Cpu, Scale, Brain, FileText, Eye, TrendingUp, Pause, Edit3, Move, List,
  Code, FileJson, BookOpen, Search, X, Lock, Unlock, History, Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Codex } from './logic/codex';
import { Telos, TelosParams } from './logic/telos';
import { Metrics } from './logic/metrics';
import { distillTextToSymbols } from './services/aiService';
import { SimulationResults, MetricsData, Symbol, AIConfig, AIProvider, CompassDirection, BridgeFamilyStats } from './types';
import { ManualChat } from './components/ManualChat';
import { COMPASS_MANUAL_CONTENT } from './constants/manualContent';
import { manualVersion } from './manual/manual.version';
import { useSimulation } from './hooks/useSimulation';
import { useUIState } from './hooks/useUIState';
import { cn } from './lib/utils';
import { clsx, type ClassValue } from 'clsx';

import { Part01ParameterOntology } from './manual/groups/part-01-parameter-ontology';
import { Part02OutputMetricsOntology } from './manual/groups/part-02-output-metrics-ontology';
import { Part03EventTraceVocabulary } from './manual/groups/part-03-event-trace-vocabulary';
import { Part04CanonicalFieldGuidance } from './manual/groups/part-04-canonical-field-guidance';
import { Part05ControlledVocabularySummary } from './manual/groups/part-05-controlled-vocabulary-summary';
import { Part06TypeScriptInterfacePack } from './manual/groups/part-06-typescript-interface-pack';
import { Part06ACanonicalImplementationOrder } from './manual/groups/part-06-a-canonical-implementation-order';
import { Part07ResearchAlignmentEvidence } from './manual/groups/part-07-research-alignment-evidence';
import { Part08ASchemaBoundary } from './manual/groups/part-08-a-schema-boundary';
import { Part08JsonSchemaValidation } from './manual/groups/part-08-json-schema-validation';
import { Part09CurrentEngineReference } from './manual/groups/part-09-current-engine-reference';
import { Part10ResearchSeamsTheoreticalFrameworks } from './manual/groups/part-10-research-seams-theoretical-frameworks';
import { Part11DevelopmentNotes } from './manual/groups/part-11-development-notes';

import { 
  AgentCard, MetricCard, VisionCard, Highlight, ManualSectionDrawer, ManualDrawer, LexiconItem, SearchContext 
} from './manual/components';

export default function App() {
  const {
    codex, narrative, params, results, metrics, simSteps, currentStepIdx, isPlaying,
    chartData, setNarrative, setParams, setSimSteps,
    setResults, setMetrics, setCurrentStepIdx, setIsPlaying,
    runSimulation, stepForward, stepBack, togglePlay, resetSimulation, handleExport,
    clearNarrative, handleRandomize, handleHardReset, addSymbol, removeSymbol,
    autoRandomize, setAutoRandomize, history, restoreFromHistory, addToHistory, setSeed
  } = useSimulation();

  const {
    activeTab, setActiveTab,
    searchQuery, setSearchQuery,
    inputText, setInputText,
    isDistilling, setIsDistilling,
    distillStatus, setDistillStatus,
    openDomain, setOpenDomain,
    openField, setOpenField,
    ontologyOpenDomain, setOntologyOpenDomain,
    ontologyOpenField, setOntologyOpenField,
    isAiConfigOpen, setIsAiConfigOpen,
    isBridgesOpen, setIsBridgesOpen,
    aiConfig, setAiConfig,
  } = useUIState();

  const filteredOntologyFields = useMemo(() => {
    if (!searchQuery) return codex.symbols.ontology_fields;
    const q = searchQuery.toLowerCase();
    
    return codex.symbols.ontology_fields?.map(field => {
      const fieldMatches = field.name.toLowerCase().includes(q) || field.description.toLowerCase().includes(q);
      
      const filteredDomains = field.domains.filter(domain => {
        const domainMatches = domain.toLowerCase().includes(q);
        if (domainMatches) return true;
        
        const glyphs = codex.symbols.domains[domain] as string[] || [];
        return glyphs.some(glyph => {
          const s = codex.getSymbol(glyph);
          return s && (s.glyph.toLowerCase().includes(q) || s.meaning.toLowerCase().includes(q));
        });
      });
      
      if (fieldMatches || filteredDomains.length > 0) {
        return {
          ...field,
          domains: fieldMatches ? field.domains : filteredDomains
        };
      }
      return null;
    }).filter(Boolean) as any[];
  }, [searchQuery, codex]);

  const handleDistill = async () => {
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
        const simResults = telos.run(symbols, simSteps);
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
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 p-4 flex items-center justify-between bg-ocean-950/40 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <motion.div 
              initial={{ rotate: -20, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              className="w-10 h-10 bg-cyan-500 flex items-center justify-center rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              <Zap className="text-ocean-950 w-6 h-6 fill-current" />
            </motion.div>
            <div>
              <h1 className="font-bold text-lg tracking-tight uppercase glow-text-cyan">The Compass</h1>
              <p className="text-[10px] opacity-40 font-mono tracking-widest">GLOBAL MEANING INFRASTRUCTURE // BW-REF.0.9</p>
            </div>
            <button 
              onClick={handleHardReset}
              className="ml-4 p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all uppercase text-[8px] font-bold tracking-widest"
              title="Hard Reset Application"
            >
              Hard Reset
            </button>
          </div>
        <nav className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
          {(['simulation', 'history', 'ontology', 'metrics', 'agents', 'manual'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all uppercase tracking-widest",
                activeTab === tab 
                  ? "bg-cyan-500 text-ocean-950 shadow-[0_0_15px_rgba(34,211,238,0.3)]" 
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
              )}
            >
              {tab === 'manual' ? 'Build Manual' : tab}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        {/* Sidebar Controls */}
        <div className="lg:col-span-3 space-y-6">
          <section className="glass-panel p-0 overflow-hidden">
            <button 
              onClick={() => setIsAiConfigOpen(!isAiConfigOpen)}
              className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">AI Configuration</h2>
              </div>
              <ChevronRight className={cn(
                "w-4 h-4 text-white/40 transition-transform duration-300",
                isAiConfigOpen && "rotate-90"
              )} />
            </button>
            
            <AnimatePresence>
              {isAiConfigOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Provider</label>
                      <select 
                        value={aiConfig.provider}
                        onChange={(e) => {
                          const newProvider = e.target.value as AIProvider;
                          setAiConfig({ 
                            ...aiConfig, 
                            provider: newProvider,
                            model: '' // Clear model to use provider defaults
                          });
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] font-mono text-cyan-400 focus:outline-none focus:border-cyan-500/50"
                      >
                        <option value="gemini">Google Gemini</option>
                        <option value="openai">OpenAI (ChatGPT)</option>
                        <option value="anthropic">Anthropic (Claude)</option>
                        <option value="grok">Grok (xAI)</option>
                        <option value="deepseek">DeepSeek</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">API Key</label>
                      <input 
                        type="password"
                        value={aiConfig.apiKey}
                        onChange={(e) => setAiConfig({ ...aiConfig, apiKey: e.target.value })}
                        placeholder="Enter your API key"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] font-mono text-cyan-400 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Model (Optional)</label>
                      <input 
                        type="text"
                        value={aiConfig.model}
                        onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                        placeholder={
                          aiConfig.provider === 'gemini' ? "gemini-3-flash-preview" : 
                          aiConfig.provider === 'openai' ? "gpt-4o" :
                          aiConfig.provider === 'anthropic' ? "claude-3-5-sonnet-latest" :
                          aiConfig.provider === 'grok' ? "grok-2-latest" :
                          "deepseek-chat"
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] font-mono text-cyan-400 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input 
                        type="checkbox"
                        id="remember-key"
                        checked={aiConfig.rememberKey}
                        onChange={(e) => setAiConfig({ ...aiConfig, rememberKey: e.target.checked })}
                        className="w-3 h-3 rounded bg-white/5 border-white/10 accent-cyan-400"
                      />
                      <label htmlFor="remember-key" className="text-[9px] font-bold uppercase tracking-widest opacity-40 cursor-pointer">
                        Remember my API key on this device
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section className="glass-panel p-5 space-y-5">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Settings2 className="w-4 h-4 text-cyan-400" />
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Parameters</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(params).filter(([key]) => key !== 'seed').map(([key, value]) => {
                const labels: Record<string, string> = {
                  alpha: "Information Weight",
                  gamma: "Coherence Weight",
                  delta: "Energy Weight",
                  beta: "Complexity Penalty",
                  lambda: "Coupling Factor (λ)",
                  maxSequenceLength: "Max Sequence Length",
                  threshold: "Observer Threshold",
                  eta: "Binding Strength (η)",
                  epsilon: "Noise Level (ε)",
                  temperature: "Simulation Temp"
                };
                const tooltips: Record<string, string> = {
                  alpha: "Influences how much the system values information richness.",
                  gamma: "Determines the importance of semantic alignment between symbols.",
                  delta: "Controls the dynamic potential and drive within the sequence.",
                  beta: "Penalizes overly convoluted or redundant symbolic structures.",
                  lambda: "Adjusts the strength of interaction between information and coherence.",
                  maxSequenceLength: "Sets the maximum number of symbols allowed in a sequence. 10 is canonical, 16 is research, 24+ is stress.",
                  threshold: "The duality level required for an 'Observer' to emerge.",
                  eta: "Controls the strength of semantic binding between symbols.",
                  epsilon: "The amount of random noise injected into the duality evolution.",
                  temperature: "Controls the stochasticity of the evolution process."
                };
                
                const label = labels[key] || key;
                const tooltip = tooltips[key];

                if (key === 'architectureMode') {
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
                        <span className="opacity-40">Architecture Mode</span>
                        <span className="text-cyan-400 font-bold">{value}</span>
                      </div>
                      <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                        {(['stratified', 'flat'] as const).map(m => (
                          <button
                            key={m}
                            onClick={() => setParams({ ...params, architectureMode: m })}
                            className={cn(
                              "flex-1 py-1 rounded text-[8px] font-bold uppercase tracking-widest transition-all",
                              params.architectureMode === m ? "bg-cyan-500 text-ocean-950" : "text-white/40 hover:bg-white/5"
                            )}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (key === 'maxSequenceLength') {
                  const val = value as number;
                  let status = "Canonical";
                  let statusColor = "text-emerald-400";
                  if (val > 10 && val <= 16) {
                    status = "Research";
                    statusColor = "text-cyan-400";
                  } else if (val > 16) {
                    status = "Stress Test";
                    statusColor = "text-amber-400";
                  }

                  return (
                    <div key={key} className="space-y-2 group relative">
                      <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
                        <span className="opacity-40 flex items-center gap-1">
                          {label}
                          {tooltip && <Info className="w-2.5 h-2.5 opacity-40" title={tooltip} />}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={cn("text-[8px] font-bold uppercase px-1 rounded bg-white/5", statusColor)}>
                            {status}
                          </span>
                          <span className="text-cyan-400 font-bold">{value}</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        step="1"
                        value={value}
                        onChange={(e) => setParams({ ...params, [key]: parseInt(e.target.value) })}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                      <div className="flex justify-between text-[7px] font-mono opacity-30 uppercase tracking-tighter">
                        <span>5</span>
                        <span className={val === 10 ? "opacity-100 font-bold text-emerald-400" : ""}>10 (Canonical)</span>
                        <span className={val === 16 ? "opacity-100 font-bold text-cyan-400" : ""}>16 (Research)</span>
                        <span>30 (Stress)</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={key} className="space-y-2 group relative">
                    <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
                      <span className="opacity-40 flex items-center gap-1">
                        {label}
                        {tooltip && <Info className="w-2.5 h-2.5 opacity-40" title={tooltip} />}
                      </span>
                      <span className="text-cyan-400 font-bold">{value}</span>
                    </div>
                    <input
                      type="range"
                      min={key === 'maxSequenceLength' ? "5" : "0"}
                      max={key === 'lambda' ? "2" : (key === 'maxSequenceLength' ? "30" : "1")}
                      step={key === 'maxSequenceLength' ? "1" : "0.01"}
                      value={value}
                      onChange={(e) => setParams({ ...params, [key]: parseFloat(e.target.value) })}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                );
              })}

              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
                  <span className="opacity-40 flex items-center gap-2">
                    Experiment Seed
                    <button 
                      onClick={() => setAutoRandomize(!autoRandomize)}
                      className={`flex items-center gap-1 px-1.5 py-0.5 rounded border transition-all ${
                        autoRandomize 
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" 
                          : "bg-white/5 border-white/10 text-white/30 hover:text-white/50"
                      }`}
                      title={autoRandomize ? "Auto-Randomize Enabled" : "Manual Seed Mode"}
                    >
                      {autoRandomize ? <RefreshCw className="w-2 h-2 animate-spin-slow" /> : <Lock className="w-2 h-2" />}
                      <span className="text-[7px] font-bold">{autoRandomize ? "AUTO" : "MANUAL"}</span>
                    </button>
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(params.seed.toString());
                      }}
                      className="p-1 hover:text-cyan-400 transition-colors"
                      title="Copy Seed"
                    >
                      <Copy className="w-2.5 h-2.5" />
                    </button>
                    <span className="text-cyan-400 font-bold">{params.seed}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={params.seed || 0}
                    onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-mono text-cyan-400 focus:outline-none focus:border-cyan-500/50"
                  />
                  <button 
                    onClick={() => setSeed(Math.floor(Math.random() * 1000000))}
                    className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-cyan-400 transition-colors"
                    title="Generate Random Seed"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Simulation Depth</label>
                  <span className="text-[10px] font-mono font-bold text-cyan-400">{simSteps} steps</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={simSteps}
                  onChange={(e) => setSimSteps(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <p className="text-[9px] opacity-30 italic leading-relaxed">Higher depth allows for deeper convergence in complex narratives.</p>
              </div>
            </div>
            <button
              onClick={runSimulation}
              className="w-full bg-cyan-500 text-ocean-950 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all uppercase text-[10px] font-bold tracking-[0.2em] shadow-[0_0_20px_rgba(34,211,238,0.2)] active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              Re-Simulate
            </button>
          </section>

          <section className="glass-panel p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Database className="w-4 h-4 text-cyan-400" />
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Quick Symbols</h2>
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredOntologyFields?.map((field) => (
                <div key={field.name} className="space-y-1">
                  <button
                    onClick={() => setOpenField(openField === field.name ? null : field.name)}
                    className={cn(
                      "w-full flex items-center justify-between p-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all border border-white/5",
                      openField === field.name ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" : "bg-white/5 text-white/40 hover:bg-white/10"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <ChevronRight className={cn("w-3 h-3 transition-transform", openField === field.name && "rotate-90")} />
                      <span>{field.name}</span>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openField === field.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-2 space-y-1"
                      >
                        {field.domains.map(domain => {
                          const glyphs = codex.symbols.domains[domain] as string[] || [];
                          if (glyphs.length === 0) return null;
                          return (
                            <div key={domain} className="space-y-1">
                              <button
                                onClick={() => setOpenDomain(openDomain === domain ? null : domain)}
                                className={cn(
                                  "w-full flex items-center justify-between p-1.5 rounded-lg text-[8px] font-bold uppercase tracking-widest transition-all border border-white/5",
                                  openDomain === domain ? "bg-white/10 text-cyan-300 border-white/20" : "bg-white/5 text-white/30 hover:bg-white/10"
                                )}
                              >
                                <span>{domain.replace(/_/g, ' ')}</span>
                                <span className="opacity-40">{glyphs.length}</span>
                              </button>
                              <AnimatePresence>
                                {openDomain === domain && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="grid grid-cols-4 gap-1 p-2 bg-black/20 rounded-lg">
                                      {glyphs.map(glyph => {
                                        const s = codex.getSymbol(glyph);
                                        return (
                                          <button
                                            key={glyph}
                                            onClick={() => addSymbol(glyph)}
                                            title={s?.meaning}
                                            className="p-2 text-xl hover:bg-cyan-500/20 rounded-lg transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
                                          >
                                            {glyph}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              {!codex.symbols.ontology_fields && Object.entries(codex.symbols.domains).map(([domain, glyphs]) => {
                const g = glyphs as string[];
                return (
                  <div key={domain} className="space-y-1">
                    <button
                      onClick={() => setOpenDomain(openDomain === domain ? null : domain)}
                      className={cn(
                        "w-full flex items-center justify-between p-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all border border-white/5",
                        openDomain === domain ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" : "bg-white/5 text-white/40 hover:bg-white/10"
                      )}
                    >
                      <span>{domain.replace(/_/g, ' ')}</span>
                      <span className="opacity-40">{g.length}</span>
                    </button>
                    <AnimatePresence>
                      {openDomain === domain && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-4 gap-1 p-2 bg-black/20 rounded-lg">
                            {g.map(glyph => {
                              const s = codex.getSymbol(glyph);
                              return (
                                <button
                                  key={glyph}
                                  onClick={() => addSymbol(glyph)}
                                  title={s?.meaning}
                                  className="p-2 text-xl hover:bg-cyan-500/20 rounded-lg transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
                                >
                                  {glyph}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* Narrative Input */}
          <section className="glass-panel p-6 border-cyan-500/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CompassIcon className="w-4 h-4 text-cyan-400 animate-pulse" />
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Initial Narrative</h2>
              </div>
              <div className="flex items-center gap-6">
                <button 
                  onClick={clearNarrative}
                  className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-all"
                >
                  Clear
                </button>
                <button 
                  onClick={handleRandomize}
                  className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/60 hover:text-cyan-400 flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3 h-3" />
                  Randomize
                </button>
                <span className="text-[10px] font-mono opacity-30 uppercase tracking-widest">Max {params.maxSequenceLength} symbols</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 min-h-[100px] p-6 bg-white/5 rounded-2xl border-2 border-dashed border-white/10 items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none" />
              <AnimatePresence mode='popLayout'>
                {narrative.map((glyph, i) => (
                  <motion.button
                    key={`${glyph}-${i}`}
                    layout
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    onClick={() => removeSymbol(i)}
                    className="text-5xl cursor-pointer drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    {glyph}
                  </motion.button>
                ))}
              </AnimatePresence>
              {narrative.length === 0 && (
                <p className="text-[10px] font-bold tracking-[0.3em] opacity-20 uppercase">Select symbols to begin</p>
              )}
            </div>
          </section>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'simulation' && (
              <div className="space-y-6">
                {/* Semantic Distillation Section */}
                <section className="glass-panel p-6 space-y-4 border-black/10 border-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-black" />
                      <h3 className="font-bold uppercase text-xs tracking-widest">Semantic Distillation</h3>
                    </div>
                    <span className="text-[10px] font-mono opacity-40 uppercase">Primary Input Method</span>
                  </div>
                  <div className="space-y-3">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Paste a story, poem, or any human/AI writing here to distill it into a symbolic narrative..."
                      className="w-full h-64 bg-black/5 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 resize-y transition-all font-serif leading-relaxed"
                    />
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-mono opacity-40 uppercase">Chars: {inputText.length}</span>
                      <span className="text-[10px] font-mono opacity-40 uppercase">V9 Context Window Active</span>
                    </div>
                    <button
                      onClick={handleDistill}
                      disabled={isDistilling || !inputText.trim()}
                      className={cn(
                        "w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all uppercase text-xs font-bold tracking-widest",
                        isDistilling ? "bg-black/20 cursor-not-allowed" : "bg-black text-white hover:bg-black/80"
                      )}
                    >
                      {isDistilling ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          {distillStatus || "Distilling Meaning..."}
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          Distill Narrative
                        </>
                      )}
                    </button>
                    {distillStatus && !isDistilling && (
                      <p className="text-[10px] text-center font-mono opacity-60 animate-pulse">{distillStatus}</p>
                    )}
                  </div>
                </section>

                {/* Simulation Results Display */}
                {results && (
                  <div className="space-y-6">
                    {results.originalText && (
                      <div className="glass-panel p-4 bg-black/5 border-black/5">
                        <div className="flex items-center gap-2 mb-2 opacity-40">
                          <FileText className="w-3 h-3" />
                          <span className="text-[10px] font-mono uppercase tracking-wider">Source Distillation</span>
                        </div>
                        <p className="text-xs font-serif italic text-black/60 line-clamp-2 hover:line-clamp-none transition-all cursor-pointer">
                          "{results.originalText}"
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-panel p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-50">Evolution Timeline</h3>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setIsPlaying(!isPlaying);
                          }}
                          className="p-1 hover:bg-black/5 rounded transition-colors text-cyan-600"
                          title={isPlaying ? "Pause" : "Play Evolution"}
                        >
                          {isPlaying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                        </button>
                        <button 
                          onClick={() => {
                            setIsPlaying(false);
                            setCurrentStepIdx(Math.max(0, currentStepIdx - 1));
                          }}
                          className="p-1 hover:bg-black/5 rounded transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 rotate-180" />
                        </button>
                        <span className="text-[10px] font-mono font-bold">Step {currentStepIdx} / {results?.history.length ? results.history.length - 1 : 0}</span>
                        <button 
                          onClick={() => {
                            setIsPlaying(false);
                            setCurrentStepIdx(Math.min((results?.history.length || 1) - 1, currentStepIdx + 1));
                          }}
                          className="p-1 hover:bg-black/5 rounded transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 min-h-[100px] items-center justify-center bg-black/5 rounded-xl p-4 border border-black/5">
                      <AnimatePresence mode='popLayout'>
                        {results?.history[currentStepIdx]?.sequence.map((glyph, i) => (
                          <motion.span
                            key={`${glyph}-${i}-${currentStepIdx}`}
                            initial={{ scale: 0, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="text-3xl"
                          >
                            {glyph}
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase font-bold opacity-40">Telic Score</span>
                        <div className="text-lg font-bold font-mono">{results?.history[currentStepIdx]?.telicScore.toFixed(4)}</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase font-bold opacity-40">Resilience</span>
                        <div className="text-lg font-bold font-mono text-blue-600">{(results?.history[currentStepIdx]?.resilience || 0).toFixed(3)}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-black/5">
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase font-bold opacity-40">Telic Curvature (κ)</span>
                        <div className="text-xs font-bold font-mono">{(results?.history[currentStepIdx]?.telicCurvature || 0).toFixed(4)}</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase font-bold opacity-40">Path Integral (P)</span>
                        <div className="text-xs font-bold font-mono">{(results?.history[currentStepIdx]?.pathIntegral || 0).toExponential(2)}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/5">
                      <div className="space-y-1">
                        <span className="text-[7px] uppercase font-bold opacity-40">Mod97</span>
                        <div className="text-xs font-mono font-bold">Φ-{results?.history[currentStepIdx]?.mod97?.toString().padStart(2, '0')}</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[7px] uppercase font-bold opacity-40">Adversarial</span>
                        <div className={cn("text-[8px] font-bold uppercase", results?.history[currentStepIdx]?.adversarialPassed ? "text-emerald-600" : "text-red-500")}>
                          {results?.history[currentStepIdx]?.adversarialPassed ? "Passed" : "Failed"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[7px] uppercase font-bold opacity-40">Compass</span>
                        <div className="text-[8px] font-bold uppercase opacity-60">{results?.history[currentStepIdx]?.compassMatch}</div>
                      </div>
                    </div>

                    <input 
                      type="range"
                      min="0"
                      max={(results?.history.length || 1) - 1}
                      value={currentStepIdx}
                      onChange={(e) => setCurrentStepIdx(parseInt(e.target.value))}
                      className="w-full h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
                    />
                  </div>

                  <div className="glass-panel p-4 h-[350px]">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-50">Telic & Duality Evolution</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#00000010" />
                        <XAxis dataKey="step" fontSize={10} />
                        <YAxis fontSize={10} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #00000010', fontSize: '10px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase' }} />
                        <Line type="monotone" dataKey="telic" stroke="#000" strokeWidth={2} dot={false} name="Telic Score" />
                        <Line type="monotone" dataKey="duality" stroke="#10b981" strokeWidth={2} dot={false} name="Duality" />
                        <Line type="monotone" dataKey="curvature" stroke="#9333ea" strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="Curvature (κ)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass-panel p-4 h-[300px]">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-50">Compression Dynamics</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#00000010" />
                      <XAxis dataKey="step" fontSize={10} />
                      <YAxis fontSize={10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #00000010', fontSize: '10px' }}
                      />
                      <Area type="step" dataKey="length" stroke="#000" fill="#00000005" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="glass-panel">
                  <div className="p-4 border-b border-black/5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-50">Compression History</h3>
                        {results?.observerEmerged && (
                          <div className="flex items-center gap-2 text-emerald-600 animate-pulse">
                            <Activity className="w-3 h-3" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Observer Emerged @ Step {results.observerStep}</span>
                          </div>
                        )}
                        {results?.history.length && results.history.length < simSteps + 1 && (
                          <div className="flex items-center gap-2 text-amber-500">
                            <Target className="w-3 h-3" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Attractor Reached @ Step {results.history.length - 1}</span>
                          </div>
                        )}
                      </div>
                    <button 
                      onClick={handleExport}
                      className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 flex items-center gap-1 transition-opacity"
                    >
                      <Database className="w-3 h-3" />
                      Export JSON
                    </button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    <div className="data-row bg-black/5 grid-cols-[40px_1fr_60px_60px_60px_60px_60px_60px_40px_80px_60px]">
                      <span className="col-header">Step</span>
                      <span className="col-header">Sequence</span>
                      <span className="col-header text-right">Telic</span>
                      <span className="col-header text-right">Info/Coh/En</span>
                      <span className="col-header text-right">Duality (R/S)</span>
                      <span className="col-header text-right">Resil</span>
                      <span className="col-header text-right">M97</span>
                      <span className="col-header text-center">Adv</span>
                      <span className="col-header text-center">Δ</span>
                      <span className="col-header text-right">Compass</span>
                      <span className="col-header text-right">Consensus</span>
                    </div>
                    {results?.history.map((step, i) => (
                      <div key={i} className={cn(
                        "data-row grid-cols-[40px_1fr_60px_60px_60px_60px_60px_60px_40px_80px_60px] hover:bg-black/5 transition-colors",
                        step.accepted === false ? "opacity-40" : ""
                      )}>
                        <span className="data-value text-[10px] opacity-40">{step.step}</span>
                        <span className="text-xl tracking-tighter flex items-center gap-1">
                          {step.sequence.join('')}
                          {step.proposalType && (
                            <span className={cn(
                              "text-[8px] font-bold uppercase px-1 rounded opacity-60",
                              step.proposalType === 'Preserver' ? "bg-emerald-500/20 text-emerald-400" :
                              step.proposalType === 'Catalyst' ? "bg-amber-500/20 text-amber-400" :
                              step.proposalType === 'Synthesizer' ? "bg-purple-500/20 text-purple-400" :
                              "bg-black/5 opacity-40"
                            )}>
                              {step.proposalType}
                            </span>
                          )}
                        </span>
                        <span className="data-value text-[10px] text-right font-bold">{step.telicScore.toFixed(3)}</span>
                        <span className="data-value text-[8px] text-right opacity-60">
                          {step.scoreInfo.toFixed(2)}/{step.scoreCoherence.toFixed(2)}/{step.scoreEnergy.toFixed(2)}
                        </span>
                        <span className="data-value text-[8px] text-right">
                          <span className="opacity-40">{step.rawDuality.toFixed(2)}</span>
                          <span className="mx-1">/</span>
                          <span className="font-bold">{step.duality.toFixed(2)}</span>
                        </span>
                        <span className="data-value text-[10px] text-right text-blue-600">{step.resilience.toFixed(3)}</span>
                        <span className="data-value text-[10px] text-right opacity-60">{step.mod97}</span>
                        <span className={cn("data-value text-[8px] text-center font-bold uppercase", step.adversarialPassed ? "text-emerald-600" : "text-red-500")}>
                          {step.adversarialPassed ? "✓" : "✗"}
                        </span>
                        <span className="flex items-center justify-center gap-0.5">
                          {step.inventoryChanged && <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" title="Inventory Changed" />}
                          {step.orderChanged && !step.inventoryChanged && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Order Changed" />}
                        </span>
                        <span className="data-value text-[9px] text-right opacity-60 uppercase font-bold">{step.compassMatch}</span>
                        <span className="data-value text-[10px] text-right font-bold text-cyan-600">{(step.consensusScore || 0).toFixed(2)}</span>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                <div className="glass-panel p-6 border-cyan-500/20">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <History className="w-5 h-5 text-cyan-400" />
                      <h2 className="text-xl font-bold text-cyan-400 uppercase tracking-widest">Simulation History</h2>
                    </div>
                    <span className="text-[10px] font-mono opacity-40 uppercase">Last 10 Experiments</span>
                  </div>
                  
                  <div className="space-y-4">
                    {history.length === 0 ? (
                      <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-2xl">
                        <p className="text-sm text-white/20 uppercase tracking-widest font-bold">No experiments recorded yet</p>
                      </div>
                    ) : (
                      history.map((run) => (
                        <div 
                          key={run.id}
                          className="group relative glass-panel p-4 hover:bg-white/5 transition-all cursor-pointer border-white/5 hover:border-cyan-500/30"
                          onClick={() => {
                            restoreFromHistory(run);
                            setActiveTab('simulation');
                          }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 font-bold text-xs">
                                {run.narrative.length}
                              </div>
                              <div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                                  {new Date(run.timestamp).toLocaleTimeString()}
                                </div>
                                <div className="text-[9px] font-mono text-cyan-400/60">
                                  SEED: {run.seed}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div className="text-right">
                                <div className="text-[8px] uppercase tracking-tighter opacity-40">Telic</div>
                                <div className="text-xs font-bold text-cyan-400">{run.summary.telic.toFixed(3)}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-[8px] uppercase tracking-tighter opacity-40">Duality</div>
                                <div className="text-xs font-bold text-purple-400">{run.summary.duality.toFixed(3)}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                            {run.narrative.map((glyph, i) => (
                              <span key={i} className="text-lg">{glyph}</span>
                            ))}
                          </div>
                          
                          <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest text-cyan-400">
                              <RefreshCw className="w-2 h-2" />
                              Restore
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ontology' && (
              <div className="space-y-6">
                <div className="glass-panel p-6 bg-cyan-500/5 border-cyan-500/20">
                  <h2 className="text-xl font-bold mb-2 text-cyan-400">The V9 Symbolic Ontology</h2>
                  <p className="text-xs text-white/60 leading-relaxed max-w-3xl">
                    The Blue Whale simulation operates on a foundational ontology of <span className="text-cyan-400 font-bold">{codex.symbols.symbols.length}</span> unique symbols. 
                    These symbols are categorized into <span className="text-cyan-400 font-bold">{Object.keys(codex.symbols.domains).length}</span> semantic domains, 
                    ranging from core physical constants to high-level consciousness operators. 
                    The system uses these as the "atoms" of narrative evolution, where meaning is compressed and transformed through cross-domain bridges and telic optimization.
                  </p>
                </div>

                {/* Global Search & Filter for Ontology */}
                <div className="max-w-md mx-auto relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
                  <input 
                    type="text"
                    placeholder="Search the Ontology..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Ontology Brief / High-level Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-panel p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Ontology Stats</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase font-bold opacity-40">Total Symbols</span>
                        <div className="text-xl font-bold font-mono">{codex.symbols.symbols.length}</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase font-bold opacity-40">Active Domains</span>
                        <div className="text-xl font-bold font-mono">{Object.keys(codex.symbols.domains).length}</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase font-bold opacity-40">Bridges</span>
                        <div className="text-xl font-bold font-mono">{codex.symbols.cross_domain_bridges.length}</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase font-bold opacity-40">Compass Nodes</span>
                        <div className="text-xl font-bold font-mono">{Object.keys(codex.symbols.compass).length}</div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel p-0 overflow-hidden md:col-span-2">
                    <button 
                      onClick={() => setIsBridgesOpen(!isBridgesOpen)}
                      className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Workflow className="w-4 h-4 text-cyan-400" />
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Cross-Domain Bridges</h3>
                      </div>
                      <ChevronRight className={cn(
                        "w-4 h-4 text-white/40 transition-transform duration-300",
                        isBridgesOpen && "rotate-90"
                      )} />
                    </button>
                    
                    <AnimatePresence>
                      {isBridgesOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {codex.symbols.cross_domain_bridges.map((bridge, i) => (
                                <div key={i} className="bg-white/5 rounded-lg p-2 border border-white/5 flex items-center justify-between">
                                  <div className="flex flex-col">
                                    <span className="text-[7px] uppercase font-bold opacity-30">{bridge.from}</span>
                                    <span className="text-[7px] uppercase font-bold opacity-30">{bridge.to}</span>
                                    {bridge.function && (
                                      <span className="text-[6px] italic opacity-50 mt-1 leading-tight">{bridge.function.replace(/_/g, ' ')}</span>
                                    )}
                                  </div>
                                  <span className="text-2xl">{bridge.symbol}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-panel p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                      <CompassIcon className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Compass Alignment</h3>
                    </div>
                    <div className="space-y-3">
                      {Object.entries(codex.symbols.compass).map(([dir, config]) => {
                        const c = config as CompassDirection;
                        return (
                          <div key={dir} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col w-20">
                                <span className="text-[10px] font-bold uppercase tracking-widest">{dir}</span>
                                {c.name && (
                                  <span className="text-[7px] italic opacity-50 leading-tight">{c.name.replace(/_/g, ' ')}</span>
                                )}
                              </div>
                              <div className="flex gap-1">
                                {c.symbols.map(s => (
                                  <span key={s} className="text-lg">{s}</span>
                                ))}
                              </div>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-cyan-400">Φ-{c.mod97?.toString().padStart(2, '0')}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="glass-panel p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                      <BarChart3 className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Domain Density</h3>
                    </div>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={Object.entries(codex.symbols.domains).map(([name, syms]) => ({ name, count: (syms as string[]).length })).sort((a, b) => b.count - a.count).slice(0, 12)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                          <XAxis dataKey="name" hide />
                          <YAxis fontSize={8} stroke="#ffffff20" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', fontSize: '10px' }}
                            itemStyle={{ color: '#22d3ee' }}
                          />
                          <Area type="monotone" dataKey="count" stroke="#22d3ee" fill="#22d3ee20" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(codex.symbols.domains).sort((a, b) => (b[1] as string[]).length - (a[1] as string[]).length).slice(0, 5).map(([name, syms]) => (
                        <span key={name} className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-bold uppercase tracking-widest opacity-40 border border-white/5">
                          {name} ({(syms as string[]).length})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-panel">
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Symbol Registry (V9 Codex)</h3>
                    <span className="text-[9px] font-mono opacity-30 uppercase">Grouped by Domain</span>
                  </div>
                  <div className="p-4 space-y-4">
                    {filteredOntologyFields?.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <button
                          onClick={() => setOntologyOpenField(ontologyOpenField === field.name ? null : field.name)}
                          className={cn(
                            "w-full flex items-center justify-between p-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all border",
                            ontologyOpenField === field.name 
                              ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" 
                              : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Layers className="w-4 h-4 opacity-40" />
                            <div className="flex flex-col items-start">
                              <span><Highlight text={field.name} query={searchQuery} /></span>
                              <span className="text-[8px] opacity-40 font-medium normal-case tracking-normal"><Highlight text={field.description} query={searchQuery} /></span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono opacity-40">{field.domains.length} Domains</span>
                            <ChevronRight className={cn("w-4 h-4 transition-transform", ontologyOpenField === field.name && "rotate-90")} />
                          </div>
                        </button>
                        <AnimatePresence>
                          {ontologyOpenField === field.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-6 space-y-2"
                            >
                              {field.domains.map(domain => {
                                const glyphs = codex.symbols.domains[domain] as string[] || [];
                                if (glyphs.length === 0) return null;
                                return (
                                  <div key={domain} className="space-y-2">
                                    <button
                                      onClick={() => setOntologyOpenDomain(ontologyOpenDomain === domain ? null : domain)}
                                      className={cn(
                                        "w-full flex items-center justify-between p-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all border",
                                        ontologyOpenDomain === domain 
                                          ? "bg-white/10 text-cyan-300 border-white/20" 
                                          : "bg-white/5 text-white/40 border-white/5 hover:bg-white/10"
                                      )}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="w-1 h-1 rounded-full bg-cyan-500/40" />
                                        <span><Highlight text={domain.replace(/_/g, ' ')} query={searchQuery} /></span>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <span className="text-[9px] font-mono opacity-40">{glyphs.length} Symbols</span>
                                        <ChevronRight className={cn("w-3 h-3 transition-transform", ontologyOpenDomain === domain && "rotate-90")} />
                                      </div>
                                    </button>
                                    <AnimatePresence>
                                      {ontologyOpenDomain === domain && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="overflow-hidden"
                                        >
                                          <div className="bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                                            <table className="w-full text-left border-collapse">
                                              <thead>
                                                <tr className="bg-white/5">
                                                  <th className="p-4 col-header">Glyph</th>
                                                  <th className="p-4 col-header">Meaning</th>
                                                  <th className="p-4 col-header text-right">Weight</th>
                                                  <th className="p-4 col-header">Opposites</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {glyphs.filter(glyph => {
                                                  if (!searchQuery) return true;
                                                  const q = searchQuery.toLowerCase();
                                                  const s = codex.getSymbol(glyph);
                                                  return (
                                                    field.name.toLowerCase().includes(q) ||
                                                    domain.toLowerCase().includes(q) ||
                                                    glyph.toLowerCase().includes(q) ||
                                                    (s && s.meaning.toLowerCase().includes(q))
                                                  );
                                                }).map(glyph => {
                                                  const s = codex.getSymbol(glyph);
                                                  if (!s) return null;
                                                  return (
                                                    <tr key={s.glyph} className="border-b border-white/5 hover:bg-cyan-500/5 transition-colors group">
                                                      <td className="p-4 text-2xl group-hover:scale-110 transition-transform inline-block">{s.glyph}</td>
                                                      <td className="p-4 text-xs font-medium text-white/80"><Highlight text={s.meaning} query={searchQuery} /></td>
                                                      <td className="p-4 text-right data-value text-xs text-white/60">{s.weight}</td>
                                                      <td className="p-4 text-xs opacity-40 italic">{s.opposites.join(', ') || '—'}</td>
                                                    </tr>
                                                  );
                                                })}
                                              </tbody>
                                            </table>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                    {!codex.symbols.ontology_fields && Object.entries(codex.symbols.domains).map(([domain, glyphs]) => {
                      const g = glyphs as string[];
                      return (
                        <div key={domain} className="space-y-2">
                          <button
                            onClick={() => setOntologyOpenDomain(ontologyOpenDomain === domain ? null : domain)}
                            className={cn(
                              "w-full flex items-center justify-between p-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all border",
                              ontologyOpenDomain === domain 
                                ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" 
                                : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <Layers className="w-4 h-4 opacity-40" />
                              <span>{domain.replace(/_/g, ' ')}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-[10px] font-mono opacity-40">{g.length} Symbols</span>
                              <ChevronRight className={cn("w-4 h-4 transition-transform", ontologyOpenDomain === domain && "rotate-90")} />
                            </div>
                          </button>
                          <AnimatePresence>
                            {ontologyOpenDomain === domain && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                                  <table className="w-full text-left border-collapse">
                                    <thead>
                                      <tr className="bg-white/5">
                                        <th className="p-4 col-header">Glyph</th>
                                        <th className="p-4 col-header">Meaning</th>
                                        <th className="p-4 col-header text-right">Weight</th>
                                        <th className="p-4 col-header">Opposites</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {g.map(glyph => {
                                        const s = codex.getSymbol(glyph);
                                        if (!s) return null;
                                        return (
                                          <tr key={s.glyph} className="border-b border-white/5 hover:bg-cyan-500/5 transition-colors group">
                                            <td className="p-4 text-2xl group-hover:scale-110 transition-transform inline-block">{s.glyph}</td>
                                            <td className="p-4 text-xs font-medium text-white/80">{s.meaning}</td>
                                            <td className="p-4 text-right data-value text-xs text-white/60">{s.weight}</td>
                                            <td className="p-4 text-xs opacity-40 italic">{s.opposites.join(', ') || '—'}</td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'metrics' && metrics && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <MetricCard 
                    title="Convergence" 
                    value={metrics.convergenceIters} 
                    unit="steps" 
                    icon={<Target className="w-4 h-4" />} 
                    desc="Steps until sequence stability"
                  />
                  <MetricCard 
                    title="Contraction" 
                    value={(metrics.contractionRate * 100).toFixed(1)} 
                    unit="%" 
                    icon={<Zap className="w-4 h-4" />} 
                    desc="Final length vs initial length"
                  />
                  <MetricCard 
                    title="Fidelity" 
                    value={metrics.fidelity.toFixed(3)} 
                    unit="ratio" 
                    icon={<Shield className="w-4 h-4" />} 
                    desc="Weight preservation index"
                  />
                  <MetricCard 
                    title="CF Index" 
                    value={metrics.cfIndex.toFixed(3)} 
                    unit="index" 
                    icon={<BarChart3 className="w-4 h-4" />} 
                    desc="Codex Fidelity (Entropy × Coherence)"
                  />
                  <MetricCard 
                    title="Resonance Signature" 
                    value={`Φ-${metrics.mod97Final.toString().padStart(2, '0')}`} 
                    unit="MOD97" 
                    icon={<CompassIcon className="w-4 h-4" />} 
                    desc="Unique symbolic fingerprint of the final narrative state."
                    status={metrics.mod97Final > 50 ? 'success' : undefined}
                  />
                  <MetricCard 
                    title="Resilience" 
                    value={metrics.resilience.toFixed(3)} 
                    unit="index" 
                    icon={<Shield className="w-4 h-4" />} 
                    desc="Ability to survive Void confrontation"
                    status={metrics.resilience > 0.5 ? 'success' : undefined}
                  />
                  <MetricCard 
                    title="Observer" 
                    value={metrics.observerEmerged ? "EMERGED" : "ABSENT"} 
                    unit="" 
                    icon={<Eye className="w-4 h-4" />} 
                    desc={`Duality crossed threshold (${params.threshold})`}
                    status={metrics.observerEmerged ? 'success' : undefined}
                  />
                  <MetricCard 
                    title="Adversarial" 
                    value={metrics.adversarialPassed ? "PASSED" : "FAILED"} 
                    unit="" 
                    icon={<Activity className="w-4 h-4" />} 
                    desc="Stability against Void negation"
                    status={metrics.adversarialPassed ? 'success' : 'error'}
                  />
                  <MetricCard 
                    title="Iterations Run" 
                    value={results?.iterationsRun || 0} 
                    unit="steps" 
                    icon={<RefreshCw className="w-4 h-4" />} 
                    desc="Total steps executed"
                  />
                  <MetricCard 
                    title="Best Score Step" 
                    value={metrics.bestScoreStep} 
                    unit="step" 
                    icon={<TrendingUp className="w-4 h-4" />} 
                    desc="Step where max telic score was first reached"
                  />
                  <MetricCard 
                    title="Plateau Start" 
                    value={metrics.plateauStartStep} 
                    unit="step" 
                    icon={<Pause className="w-4 h-4" />} 
                    desc="First step after which score never improved"
                  />
                  <MetricCard 
                    title="Last Inventory Change" 
                    value={metrics.lastInventoryChangeStep} 
                    unit="step" 
                    icon={<Edit3 className="w-4 h-4" />} 
                    desc="Last step where sequence was modified"
                  />
                  <MetricCard 
                    title="Last Order Change" 
                    value={metrics.lastOrderChangeStep} 
                    unit="step" 
                    icon={<Move className="w-4 h-4" />} 
                    desc="Last step where sequence order changed"
                  />
                  <MetricCard 
                    title="Last Accepted Proposal" 
                    value={metrics.lastAcceptedChangeStep} 
                    unit="step" 
                    icon={<CheckCircle2 className="w-4 h-4" />} 
                    desc="Last step where any proposal was accepted"
                  />
                  <MetricCard 
                    title="Last Meaningful Change" 
                    value={metrics.lastMeaningfulAcceptedStep} 
                    unit="step" 
                    icon={<Zap className="w-4 h-4" />} 
                    desc="Last step with inventory change or score shift"
                  />
                  <MetricCard 
                    title="Kernel Purity" 
                    value={(metrics.kernelPurity * 100).toFixed(1)} 
                    unit="%" 
                    icon={<Target className="w-4 h-4" />} 
                    desc="Proportion of kernel symbols in final state"
                  />
                  <MetricCard 
                    title="Bridge Activation" 
                    value={(metrics.bridgeActivationRate * 100).toFixed(1)} 
                    unit="%" 
                    icon={<Workflow className="w-4 h-4" />} 
                    desc="Cross-domain transition frequency"
                  />
                  <MetricCard 
                    title="Consensus Score" 
                    value={metrics.mirrorMetric.toFixed(3)} 
                    unit="avg" 
                    icon={<CheckCircle2 className="w-4 h-4" />} 
                    desc="Average agent consensus across simulation"
                  />
                  <MetricCard 
                    title="Telic Trend" 
                    value={metrics.telicScoreTrend > 0 ? `+${metrics.telicScoreTrend.toFixed(4)}` : metrics.telicScoreTrend.toFixed(4)} 
                    unit="Δ" 
                    icon={<TrendingUp className="w-4 h-4" />} 
                    desc="Final step score improvement"
                  />
                  <MetricCard 
                    title="Total Bridges" 
                    value={metrics.totalBridges} 
                    unit="count" 
                    icon={<Workflow className="w-4 h-4" />} 
                    desc="Total accepted bridge crossings across all steps"
                  />
                  <MetricCard 
                    title="Unique Bridges" 
                    value={metrics.uniqueBridges} 
                    unit="types" 
                    icon={<Layers className="w-4 h-4" />} 
                    desc="Number of distinct bridge keys activated"
                  />
                </div>

                {results?.proposalStats && (
                  <div className="mt-16 space-y-8">
                    <div className="flex items-center gap-4 text-cyan-400">
                      <Activity className="w-6 h-6" />
                      <h4 className="font-bold uppercase text-xs tracking-[0.4em]">Proposal Statistics</h4>
                    </div>
                    <div className="glass-panel overflow-hidden">
                      <div className="data-row bg-black/5 grid-cols-[120px_1fr_1fr_1fr_1fr]">
                        <span className="col-header">Operator</span>
                        <span className="col-header text-right">Proposed</span>
                        <span className="col-header text-right">Accepted</span>
                        <span className="col-header text-right">Accept Rate</span>
                        <span className="col-header text-right">Avg Δ Score</span>
                      </div>
                      {Object.entries(results.proposalStats.counts).map(([type, stats]) => {
                        const s = stats as any;
                        return (
                          <div key={type} className="data-row grid-cols-[120px_1fr_1fr_1fr_1fr] hover:bg-black/5 transition-colors">
                            <span className="data-value text-[10px] font-bold uppercase tracking-widest opacity-60">{type}</span>
                            <span className="data-value text-[10px] text-right">{s.proposed}</span>
                            <span className="data-value text-[10px] text-right">{s.accepted}</span>
                            <span className="data-value text-[10px] text-right font-bold">
                              {(s.acceptanceRate * 100).toFixed(1)}%
                            </span>
                            <span className={cn(
                              "data-value text-[10px] text-right",
                              s.meanDeltaScore > 0 ? "text-emerald-500" : s.meanDeltaScore < 0 ? "text-red-500" : ""
                            )}>
                              {s.accepted > 0 ? s.meanDeltaScore.toFixed(3) : "—"}
                            </span>
                          </div>
                        );
                      })}
                      <div className="data-row bg-cyan-500/5 grid-cols-[120px_1fr_1fr_1fr_1fr] font-bold">
                        <span className="data-value text-[10px] uppercase tracking-widest text-cyan-500">Total</span>
                        <span className="data-value text-[10px] text-right">{results.proposalStats.totalProposed}</span>
                        <span className="data-value text-[10px] text-right">{results.proposalStats.totalAccepted}</span>
                        <span className="data-value text-[10px] text-right">
                          {(results.proposalStats.acceptanceRateOverall * 100).toFixed(1)}%
                        </span>
                        <span className="data-value text-[10px] text-right">—</span>
                      </div>
                      <div className="data-row bg-black/20 grid-cols-[120px_1fr_1fr_1fr_1fr] text-white/40 italic">
                        <span className="data-value text-[10px] uppercase tracking-widest">None (No-op)</span>
                        <span className="data-value text-[10px] text-right">{results.proposalStats.noneProposed}</span>
                        <span className="data-value text-[10px] text-right">—</span>
                        <span className="data-value text-[10px] text-right">—</span>
                        <span className="data-value text-[10px] text-right">—</span>
                      </div>
                    </div>
                  </div>
                )}

                {results?.history && (
                  <div className="mt-16 space-y-8">
                    <div className="flex items-center gap-4 text-cyan-400">
                      <Workflow className="w-6 h-6" />
                      <h4 className="font-bold uppercase text-xs tracking-[0.4em]">Bridge Activity Trace</h4>
                    </div>
                    <div className="glass-panel overflow-hidden">
                      <div className="data-row bg-black/5 grid-cols-[60px_120px_100px_100px_1fr_80px_80px]">
                        <span className="col-header">Step</span>
                        <span className="col-header">Bridge Key</span>
                        <span className="col-header">From</span>
                        <span className="col-header">To</span>
                        <span className="col-header">Agent / Op</span>
                        <span className="col-header text-right">Δ Score</span>
                        <span className="col-header text-right">Status</span>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                        {results.history.flatMap(h => (h.bridgeEvents || []).map(e => ({ ...e, step: h.step }))).length > 0 ? (
                          results.history.flatMap(h => (h.bridgeEvents || []).map(e => ({ ...e, step: h.step }))).map((event, idx) => (
                            <div key={`${event.step}-${idx}`} className={cn(
                              "data-row grid-cols-[60px_120px_100px_100px_1fr_80px_80px] hover:bg-white/5 transition-colors border-b border-white/5",
                              !event.accepted && "opacity-40 grayscale-[0.5]"
                            )}>
                              <span className="data-value text-[10px] opacity-40">{event.step}</span>
                              <span className="data-value text-[10px] font-bold text-cyan-400 truncate pr-2" title={event.bridgeKey}>
                                {event.bridgeKey}
                              </span>
                              <span className="data-value text-[10px] flex items-center gap-1">
                                <span className="text-lg">{event.fromSymbol}</span>
                                <span className="opacity-40 text-[8px] uppercase">{event.fromDomain}</span>
                              </span>
                              <span className="data-value text-[10px] flex items-center gap-1">
                                <span className="text-lg">{event.toSymbol}</span>
                                <span className="opacity-40 text-[8px] uppercase">{event.toDomain}</span>
                              </span>
                              <span className="data-value text-[10px] flex items-center gap-2">
                                <span className="px-1.5 py-0.5 rounded bg-white/5 text-[8px] font-bold uppercase tracking-tighter text-white/60">
                                  {event.agent}
                                </span>
                                <span className="opacity-40 text-[8px] uppercase">{event.proposalType}</span>
                              </span>
                              <span className={cn(
                                "data-value text-[10px] text-right font-mono",
                                event.deltaScore > 0 ? "text-emerald-400" : event.deltaScore < 0 ? "text-red-400" : ""
                              )}>
                                {event.deltaScore > 0 ? "+" : ""}{event.deltaScore.toFixed(3)}
                              </span>
                              <span className="data-value text-right">
                                {event.accepted ? (
                                  <span className="text-[8px] font-bold uppercase text-emerald-400 px-1 bg-emerald-400/10 rounded">Accepted</span>
                                ) : (
                                  <span className="text-[8px] font-bold uppercase text-white/20 px-1 bg-white/5 rounded">Rejected</span>
                                )}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="p-12 text-center space-y-2">
                            <Workflow className="w-8 h-8 text-white/10 mx-auto" />
                            <p className="text-[10px] uppercase tracking-widest text-white/20">No bridge activations recorded in this run</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {results?.bridgeSummary && Object.keys(results.bridgeSummary.families).length > 0 && (
                  <div className="mt-16 space-y-8">
                    <div className="flex items-center gap-4 text-cyan-400">
                      <Layers className="w-6 h-6" />
                      <h4 className="font-bold uppercase text-xs tracking-[0.4em]">Bridge Family Statistics</h4>
                    </div>
                    <div className="glass-panel overflow-hidden">
                      <div className="data-row bg-black/5 grid-cols-[180px_1fr_1fr_1fr_1fr_1fr_1fr]">
                        <span className="col-header">Family</span>
                        <span className="col-header text-right">Proposed</span>
                        <span className="col-header text-right">Accepted</span>
                        <span className="col-header text-right">Accept Rate</span>
                        <span className="col-header text-right">Avg Δ Score</span>
                        <span className="col-header text-right">Avg Δ Φ</span>
                        <span className="col-header text-right">Safe Rate</span>
                      </div>
                      {Object.entries(results.bridgeSummary.families).map(([family, s]) => {
                        const stats = s as BridgeFamilyStats;
                        return (
                          <div key={family} className="data-row grid-cols-[180px_1fr_1fr_1fr_1fr_1fr_1fr] hover:bg-black/5 transition-colors">
                            <span className="data-value text-[10px] font-bold text-cyan-400 truncate pr-2" title={family}>
                              {family}
                            </span>
                            <span className="data-value text-[10px] text-right">{stats.proposed}</span>
                            <span className="data-value text-[10px] text-right">{stats.accepted}</span>
                            <span className="data-value text-[10px] text-right font-bold">
                              {(stats.acceptanceRate * 100).toFixed(1)}%
                            </span>
                            <span className={cn(
                              "data-value text-[10px] text-right font-mono",
                              stats.meanAcceptedDeltaScore > 0 ? "text-emerald-400" : stats.meanAcceptedDeltaScore < 0 ? "text-red-400" : ""
                            )}>
                              {stats.accepted > 0 ? (stats.meanAcceptedDeltaScore > 0 ? "+" : "") + stats.meanAcceptedDeltaScore.toFixed(3) : "—"}
                            </span>
                            <span className={cn(
                              "data-value text-[10px] text-right font-mono",
                              stats.meanAcceptedDeltaCoherence > 0 ? "text-emerald-400" : stats.meanAcceptedDeltaCoherence < 0 ? "text-red-400" : ""
                            )}>
                              {stats.accepted > 0 ? (stats.meanAcceptedDeltaCoherence > 0 ? "+" : "") + stats.meanAcceptedDeltaCoherence.toFixed(4) : "—"}
                            </span>
                            <span className={cn(
                              "data-value text-[10px] text-right font-bold",
                              stats.acceptedSafeRate > 0.8 ? "text-emerald-400" : stats.acceptedSafeRate < 0.5 ? "text-red-400" : "text-amber-400"
                            )}>
                              {stats.accepted > 0 ? (stats.acceptedSafeRate * 100).toFixed(1) + "%" : "—"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="glass-panel p-6 space-y-4">
                        <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Rejected Bridge Analysis</h5>
                        <div className="space-y-2">
                          {Object.entries(results.bridgeSummary.families).filter(([_, s]) => (s as BridgeFamilyStats).rejected > 0).map(([family, s]) => {
                            const stats = s as BridgeFamilyStats;
                            return (
                              <div key={family} className="flex justify-between items-center text-[10px]">
                                <span className="text-white/60 truncate max-w-[150px]">{family}</span>
                                <div className="flex gap-4">
                                  <span className="text-red-400/60">Avoided Δ Score: {stats.meanRejectedDeltaScore.toFixed(2)}</span>
                                  <span className="text-red-400/60">Avoided Δ Φ: {stats.meanRejectedDeltaCoherence.toFixed(4)}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="glass-panel p-6 space-y-4">
                        <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Structural Impact</h5>
                        <div className="space-y-2">
                          {Object.entries(results.bridgeSummary.families).filter(([_, s]) => (s as BridgeFamilyStats).accepted > 0).map(([family, s]) => {
                            const stats = s as BridgeFamilyStats;
                            return (
                              <div key={family} className="flex justify-between items-center text-[10px]">
                                <span className="text-white/60 truncate max-w-[150px]">{family}</span>
                                <div className="flex gap-4">
                                  <span className={cn(stats.meanKernelPurityChange >= 0 ? "text-emerald-400/60" : "text-red-400/60")}>
                                    Purity: {stats.meanKernelPurityChange >= 0 ? "+" : ""}{(stats.meanKernelPurityChange * 100).toFixed(1)}%
                                  </span>
                                  <span className={cn(stats.meanKernelDivergenceChange <= 0 ? "text-emerald-400/60" : "text-red-400/60")}>
                                    Divergence: {stats.meanKernelDivergenceChange >= 0 ? "+" : ""}{(stats.meanKernelDivergenceChange * 100).toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === 'agents' && (
              <div className="space-y-12 max-w-5xl mx-auto pb-32">
                <header className="text-center space-y-6">
                  <div className="inline-block px-4 py-1.5 bg-cyan-500 text-ocean-950 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-4 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                    Agent Intelligence
                  </div>
                  <h2 className="text-6xl font-bold tracking-tighter uppercase glow-text-cyan">The Agent Trinity</h2>
                  <p className="text-xl text-white/40 max-w-3xl mx-auto leading-relaxed">
                    Defining the roles and strategies of the autonomous intelligences driving the simulation.
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <AgentCard 
                    icon={<Anchor className="w-8 h-8" />}
                    name="The Preserver"
                    role="Stability Agent"
                    mission="Maintain structural integrity and protect the Invariant Kernel."
                    strategy="Focuses on 'Kernel' symbols. Inserts foundational elements and removes noise that dilutes the core message."
                    color="cyan"
                  />
                  <AgentCard 
                    icon={<Zap className="w-8 h-8" />}
                    name="The Catalyst"
                    role="Innovation Agent"
                    mission="Navigate the symbolic space and optimize transitions."
                    strategy="Uses 'Swaps' to reorder the sequence, seeking higher coherence and semantic resonance without changing the inventory."
                    color="emerald"
                  />
                  <AgentCard 
                    icon={<Workflow className="w-8 h-8" />}
                    name="The Synthesizer"
                    role="Integration Agent"
                    mission="Build complexity and cross-domain bridges."
                    strategy="Focuses on 'Periphery' symbols and 'Combinations'. Merges symbols to create higher-order meanings and bridges."
                    color="purple"
                  />
                </div>

                <div className="glass-panel p-8 space-y-8">
                  <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                    <Cpu className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-xl font-bold uppercase tracking-widest">Agent Interaction Dynamics</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Consensus Mechanism</h4>
                      <p className="text-sm text-white/40 leading-relaxed">
                        The simulation operates on a <strong>Stratified Proposal</strong> model. Each agent proposes a change based on its unique mission. The system evaluates these proposals against the <strong>Telic Score</strong> (Objective Fitness).
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3 text-xs text-white/60">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>Proposals are accepted if they improve the overall Telic Score or pass a stochastic temperature check.</span>
                        </li>
                        <li className="flex items-start gap-3 text-xs text-white/60">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>Agents compete for influence over the sequence, creating a dynamic tension between stability and innovation.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Emergence Thresholds</h4>
                      <p className="text-sm text-white/40 leading-relaxed">
                        When agent activity leads to a <strong>Duality</strong> score above the threshold, the <strong>Observer</strong> emerges, marking a transition from raw data to conscious narrative.
                      </p>
                      <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Observer Emergence</span>
                          <span className="text-[10px] font-mono text-cyan-400">Φ ≥ {params.threshold}</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 w-3/4 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'manual' && (
              <SearchContext.Provider value={searchQuery}>
                <div className="space-y-12 max-w-5xl mx-auto pb-32">
                  <header className="text-center space-y-6">
                    <div className="inline-block px-4 py-1.5 bg-cyan-500 text-ocean-950 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-4 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                      Developer Reference
                    </div>
                    <h2 className="text-6xl font-bold tracking-tighter uppercase glow-text-cyan">Build Manual</h2>
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                      Sync ID: {manualVersion.syncId}
                    </div>
                    <p className="text-xl text-white/40 max-w-3xl mx-auto leading-relaxed">
                      Canonical documentation for The Compass simulation engine, parameters, and metrics.
                    </p>
                  </header>

                  {/* Global Search & Filter */}
                  <div className="max-w-md mx-auto relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
                    <input 
                      type="text"
                      placeholder="Search the V9 Lexicon & Technical Manual..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <Part01ParameterOntology />
                    <Part02OutputMetricsOntology />
                    <Part03EventTraceVocabulary />
                    <Part04CanonicalFieldGuidance />
                    <Part05ControlledVocabularySummary />
                    <Part06TypeScriptInterfacePack />
                    <Part06ACanonicalImplementationOrder />
                    <Part07ResearchAlignmentEvidence />
                    <Part08ASchemaBoundary />
                    <Part08JsonSchemaValidation />
                    <Part09CurrentEngineReference />
                    <Part10ResearchSeamsTheoreticalFrameworks />
                    <Part11DevelopmentNotes />
                  </div>
                </div>
              </SearchContext.Provider>
            )}
          </div>
        </div>
      </main>

      {/* Footer Status Bar */}
      <footer className="border-t border-white/10 p-3 bg-ocean-950/60 backdrop-blur-md flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.2em] text-white/30">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
            <span>Status: Operational</span>
          </div>
          <span>Engine: Telos v0.9</span>
          <span>Ontology: Codex V9</span>
          <span className="hidden sm:inline">Seed: ga20ha</span>
        </div>
        <div className="font-bold">
          © 2026 Blue Whale Research Team
        </div>
      </footer>
      {activeTab === 'manual' && (
        <ManualChat config={aiConfig} manualContext={COMPASS_MANUAL_CONTENT} />
      )}
    </div>
  );
}

