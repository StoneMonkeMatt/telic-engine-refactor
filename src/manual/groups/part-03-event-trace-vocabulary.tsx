import React from 'react';
import { Activity } from 'lucide-react';
import { ManualSectionDrawer } from '../components/ManualSectionDrawer';
import { ManualDrawer } from '../components/ManualDrawer';
import { LexiconItem } from '../components/LexiconItem';
import { EVENT_VOCABULARY } from '../content/event-vocabulary';
import { SUMMARY_FIELDS } from '../content/summary-fields';

export const Part03EventTraceVocabulary: React.FC = () => {
  return (
    <ManualSectionDrawer 
      icon={Activity} 
      title="Part III. Event and Trace Vocabulary" 
      subtitle="Standardized Logging and Summary Fields"
    >
      <div className="space-y-4 text-sm text-white/60 leading-relaxed">
        <p>
          This vocabulary defines the standard event types and summary fields used to record and analyze the trajectory of a simulation run. Consistent use of these terms ensures interoperability across different engine versions and analysis tools.
        </p>
      </div>

      <div className="space-y-2 pt-6 border-t border-white/5">
        <ManualDrawer title="A. State Transitions (Events)">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Events tracking modifications to the symbolic state.</p>
            {EVENT_VOCABULARY.filter(e => e.category === "State Transition").map((event, i) => (
              <div key={i}>
                <LexiconItem 
                  label={event.label}
                  dbLabel={event.id}
                  meaning={event.description}
                  question={event.question}
                  interpretation={event.interpretation}
                />
              </div>
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="B. Convergence & Stability (Events)">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Events tracking the stabilization of the run.</p>
            {EVENT_VOCABULARY.filter(e => e.category === "Convergence").map((event, i) => (
              <div key={i}>
                <LexiconItem 
                  label={event.label}
                  dbLabel={event.id}
                  meaning={event.description}
                  question={event.question}
                  interpretation={event.interpretation}
                />
              </div>
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="C. Emergence & Observation (Events)">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Events tracking emergent properties and observer interactions.</p>
            {EVENT_VOCABULARY.filter(e => e.category === "Emergence").map((event, i) => (
              <div key={i}>
                <LexiconItem 
                  label={event.label}
                  dbLabel={event.id}
                  meaning={event.description}
                  question={event.question}
                  interpretation={event.interpretation}
                />
              </div>
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="D. Integrity & Failure (Events)">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Events tracking risks and failures.</p>
            {EVENT_VOCABULARY.filter(e => e.category === "Integrity").map((event, i) => (
              <div key={i}>
                <LexiconItem 
                  label={event.label}
                  dbLabel={event.id}
                  meaning={event.description}
                  question={event.question}
                  interpretation={event.interpretation}
                />
              </div>
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="E. Temporal Milestones (Summary)">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Key steps in the simulation timeline.</p>
            {SUMMARY_FIELDS.filter(f => f.category === "Temporal Milestones").map((field, i) => (
              <div key={i}>
                <LexiconItem 
                  label={field.label}
                  dbLabel={field.id}
                  meaning={field.description}
                  question={field.question}
                />
              </div>
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="F. Finality & Persistence (Summary)">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Tracking the last occurrences of key changes.</p>
            {SUMMARY_FIELDS.filter(f => f.category === "Finality & Persistence").map((field, i) => (
              <div key={i}>
                <LexiconItem 
                  label={field.label}
                  dbLabel={field.id}
                  meaning={field.description}
                  question={field.question}
                />
              </div>
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="G. Cumulative Statistics (Summary)">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Aggregate counts of simulation events.</p>
            {SUMMARY_FIELDS.filter(f => f.category === "Cumulative Statistics").map((field, i) => (
              <div key={i}>
                <LexiconItem 
                  label={field.label}
                  dbLabel={field.id}
                  meaning={field.description}
                  question={field.question}
                />
              </div>
            ))}
          </div>
        </ManualDrawer>

        <ManualDrawer title="H. Performance Ratios (Summary)">
          <div className="space-y-4">
            <p className="text-[10px] text-white/40 italic mb-4">Ratios used to evaluate the quality of the run.</p>
            {SUMMARY_FIELDS.filter(f => f.category === "Performance Ratios").map((field, i) => (
              <div key={i}>
                <LexiconItem 
                  label={field.label}
                  dbLabel={field.id}
                  meaning={field.description}
                  question={field.question}
                  interpretation={field.interpretation}
                />
              </div>
            ))}
          </div>
        </ManualDrawer>
      </div>
    </ManualSectionDrawer>
  );
};
