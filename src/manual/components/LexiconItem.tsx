import React from 'react';
import { SearchContext } from './SearchContext';
import { Highlight } from './Highlight';

export const LexiconItem: React.FC<{ 
  label: string, 
  dbLabel: string, 
  role?: string, 
  meaning: string, 
  effect?: string, 
  notes?: string,
  question?: string,
  interpretation?: string,
  typicalValues?: string
}> = ({ 
  label, 
  dbLabel, 
  role, 
  meaning, 
  effect, 
  notes,
  question,
  interpretation,
  typicalValues
}) => {
  const searchQuery = React.useContext(SearchContext);

  const isMatch = !searchQuery || 
    label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dbLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (role && role.toLowerCase().includes(searchQuery.toLowerCase())) ||
    meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (effect && effect.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (notes && notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (question && question.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (interpretation && interpretation.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typicalValues && typicalValues.toLowerCase().includes(searchQuery.toLowerCase()));

  if (!isMatch) return null;

  return (
    <div className="space-y-3 pb-6 border-b border-white/5 last:border-0 last:pb-0">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
          <Highlight text={label} query={searchQuery} />
        </div>
        <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
          DB: <Highlight text={dbLabel} query={searchQuery} />
        </div>
      </div>
      {role && (
        <div className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">
          <Highlight text={role} query={searchQuery} />
        </div>
      )}
      
      <div className="space-y-2">
        <p className="text-[10px] text-white/70 leading-relaxed">
          <span className="text-white/30 uppercase tracking-tighter mr-2">Meaning:</span>
          <Highlight text={meaning} query={searchQuery} />
        </p>
        {question && (
          <p className="text-[10px] text-white/60 leading-relaxed">
            <span className="text-white/30 uppercase tracking-tighter mr-2">Question:</span>
            <Highlight text={question} query={searchQuery} />
          </p>
        )}
        {interpretation && (
          <p className="text-[10px] text-white/50 leading-relaxed">
            <span className="text-white/20 uppercase tracking-tighter mr-2">Interpretation (+):</span>
            <Highlight text={interpretation} query={searchQuery} />
          </p>
        )}
        {typicalValues && (
          <p className="text-[10px] text-white/50 leading-relaxed">
            <span className="text-white/20 uppercase tracking-tighter mr-2">Typical Values:</span>
            <Highlight text={typicalValues} query={searchQuery} />
          </p>
        )}
        {effect && (
          <p className="text-[10px] text-white/50 leading-relaxed">
            <span className="text-white/20 uppercase tracking-tighter mr-2">Effect (+):</span>
            <Highlight text={effect} query={searchQuery} />
          </p>
        )}
        {notes && (
          <div className="p-2 bg-white/5 rounded border border-white/5 text-[9px] text-white/40 italic">
            <span className="not-italic font-bold text-white/20 mr-2">NOTE:</span>
            <Highlight text={notes} query={searchQuery} />
          </div>
        )}
      </div>
    </div>
  );
}
