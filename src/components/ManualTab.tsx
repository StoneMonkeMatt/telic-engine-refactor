import React from 'react';
import { Search, X } from 'lucide-react';
import { manualVersion } from '../manual/manual.version';
import { ManualChat } from './ManualChat';
import { COMPASS_MANUAL_CONTENT } from '../constants/manualContent';
import { SearchContext } from '../manual/components';
import { AIConfig } from '../types';

import { Part01ParameterOntology } from '../manual/groups/part-01-parameter-ontology';
import { Part02OutputMetricsOntology } from '../manual/groups/part-02-output-metrics-ontology';
import { Part03EventTraceVocabulary } from '../manual/groups/part-03-event-trace-vocabulary';
import { Part04CanonicalFieldGuidance } from '../manual/groups/part-04-canonical-field-guidance';
import { Part05ControlledVocabularySummary } from '../manual/groups/part-05-controlled-vocabulary-summary';
import { Part06TypeScriptInterfacePack } from '../manual/groups/part-06-typescript-interface-pack';
import { Part06ACanonicalImplementationOrder } from '../manual/groups/part-06-a-canonical-implementation-order';
import { Part07ResearchAlignmentEvidence } from '../manual/groups/part-07-research-alignment-evidence';
import { Part08ASchemaBoundary } from '../manual/groups/part-08-a-schema-boundary';
import { Part08JsonSchemaValidation } from '../manual/groups/part-08-json-schema-validation';
import { Part09CurrentEngineReference } from '../manual/groups/part-09-current-engine-reference';
import { Part10ResearchSeamsTheoreticalFrameworks } from '../manual/groups/part-10-research-seams-theoretical-frameworks';
import { Part11DevelopmentNotes } from '../manual/groups/part-11-development-notes';

interface ManualTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  aiConfig: AIConfig;
}

export function ManualTab({ searchQuery, setSearchQuery, aiConfig }: ManualTabProps) {
  return (
    <>
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
      
      <ManualChat config={aiConfig} manualContext={COMPASS_MANUAL_CONTENT} />
    </>
  );
}
