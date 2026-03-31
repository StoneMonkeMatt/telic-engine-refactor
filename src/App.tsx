/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, lazy, Suspense } from 'react';
import { 
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SimulationTab } from './components/SimulationTab';
import { HistoryTab } from './components/HistoryTab';

const OntologyTab = lazy(() => import('./components/OntologyTab').then(m => ({ default: m.OntologyTab })));
const MetricsTab = lazy(() => import('./components/MetricsTab').then(m => ({ default: m.MetricsTab })));
const AgentsTab = lazy(() => import('./components/AgentsTab').then(m => ({ default: m.AgentsTab })));
const ManualTab = lazy(() => import('./components/ManualTab').then(m => ({ default: m.ManualTab })));

import { ParameterPanel } from './components/ParameterPanel';
import { AIConfigPanel } from './components/AIConfigPanel';
import { QuickSymbolsPanel } from './components/QuickSymbolsPanel';
import { useSimulation } from './hooks/useSimulation';
import { useUIState } from './hooks/useUIState';
import { useFilteredOntologyFields } from './hooks/useFilteredOntologyFields';
import { cn } from './lib/utils';
import { OntologyField } from './types';


export default function App() {
  const {
    codex, narrative, params, results, metrics, simSteps, currentStepIdx, isPlaying,
    chartData, setParams, setSimSteps,
    setCurrentStepIdx, setIsPlaying,
    runSimulation, handleExport,
    clearNarrative, handleRandomize, handleHardReset, addSymbol, removeSymbol,
    autoRandomize, setAutoRandomize, history, restoreFromHistory, setSeed,
    isDistilling, distillStatus, runDistillationFromText
  } = useSimulation();

  const {
    activeTab, setActiveTab,
    searchQuery, setSearchQuery,
    inputText, setInputText,
    ontologyOpenDomain, setOntologyOpenDomain,
    ontologyOpenField, setOntologyOpenField,
    isAiConfigOpen, setIsAiConfigOpen,
    isBridgesOpen, setIsBridgesOpen,
    aiConfig, setAiConfig,
  } = useUIState();

  const filteredOntologyFields = useFilteredOntologyFields(codex, searchQuery);

  const handleDistill = async () => {
    await runDistillationFromText(inputText, aiConfig, simSteps);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'simulation':
        return (
          <SimulationTab
            simulationState={{
              codex,
              narrative,
              params,
              results,
              metrics,
              simSteps,
              currentStepIdx,
              isPlaying,
              chartData
            }}
            inputState={{
              inputText,
              isDistilling,
              distillStatus
            }}
            simulationActions={{
              clearNarrative,
              handleRandomize,
              removeSymbol,
              runSimulation,
              setCurrentStepIdx,
              setIsPlaying,
              handleExport,
              setInputText,
              handleDistill
            }}
          />
        );
      case 'history':
        return (
          <HistoryTab
            history={history}
            restoreFromHistory={restoreFromHistory}
            setActiveTab={setActiveTab}
          />
        );
      case 'ontology':
        return (
          <OntologyTab
            codex={codex}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            ontologyOpenField={ontologyOpenField}
            setOntologyOpenField={setOntologyOpenField}
            ontologyOpenDomain={ontologyOpenDomain}
            setOntologyOpenDomain={setOntologyOpenDomain}
            isBridgesOpen={isBridgesOpen}
            setIsBridgesOpen={setIsBridgesOpen}
            filteredOntologyFields={filteredOntologyFields}
          />
        );
      case 'metrics':
        return metrics ? (
          <MetricsTab
            metrics={metrics}
            results={results}
            params={params}
          />
        ) : null;
      case 'agents':
        return <AgentsTab params={params} />;
      case 'manual':
        return (
          <ManualTab 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            aiConfig={aiConfig} 
          />
        );
      default:
        return null;
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
          <AIConfigPanel 
            isAiConfigOpen={isAiConfigOpen}
            setIsAiConfigOpen={setIsAiConfigOpen}
            aiConfig={aiConfig}
            setAiConfig={setAiConfig}
          />

          <ParameterPanel 
            params={params}
            setParams={setParams}
            simSteps={simSteps}
            setSimSteps={setSimSteps}
            runSimulation={runSimulation}
            autoRandomize={autoRandomize}
            setAutoRandomize={setAutoRandomize}
            setSeed={setSeed}
          />

          <QuickSymbolsPanel 
            codex={codex}
            filteredOntologyFields={filteredOntologyFields}
            addSymbol={addSymbol}
          />
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* Tab Content */}
          <div className="min-h-[400px]">
            <Suspense fallback={
              <div className="w-full h-[400px] flex flex-col items-center justify-center bg-ocean-900/20 border border-white/5 rounded-2xl animate-pulse">
                <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4" />
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-500/50">Initializing Module...</p>
              </div>
            }>
              {renderTabContent()}
            </Suspense>
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
    </div>
  );
}

