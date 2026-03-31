import React from 'react';
import { StickyNote, Calendar } from 'lucide-react';
import { ManualSectionDrawer } from '../components/ManualSectionDrawer';
import { ManualDrawer } from '../components/ManualDrawer';

import { DEVELOPMENT_NOTES } from '../content/development-notes';

export const Part11DevelopmentNotes: React.FC = () => {
  return (
    <ManualSectionDrawer 
      icon={StickyNote} 
      title="Part XI. Development Notes" 
      subtitle="Dated logs and structural breakdowns for the manual build"
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-2">
            <h4 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Development Note Rule</h4>
            <p className="text-xs text-amber-200/60 leading-relaxed italic">
              Entries in Part XI are dated implementation notes and migration guidance. They do not override the canonical contract defined in Parts I–VIII, and they do not replace the live-engine reference documented in Part IX.
            </p>
          </div>
          
          <p className="text-sm text-white/60 leading-relaxed">
            This section contains dated development notes, architectural breakdowns, and implementation plans. It serves as a living record of the project's evolution and a structured way to track upcoming changes.
          </p>
        </div>

        <div className="space-y-6">
          {DEVELOPMENT_NOTES.map((note, idx) => (
            <div key={idx}>
              <ManualDrawer 
                title={
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{note.date}: {note.title}</span>
                  </div>
                } 
                defaultOpen={idx === 0}
                keywords={note.keywords}
              >
                <div className="space-y-6 text-xs text-white/60 leading-relaxed">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-6">
                    
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Status</h4>
                      <p>{note.status}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Files to Adapt</h4>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        {note.filesToAdapt.map((f, i) => (
                          <li key={i}><span className="font-bold text-white/80">{f.file}</span>: {f.changes}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">New Files / Folders</h4>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        {note.newFiles.map((f, i) => (
                          <li key={i}><span className="font-bold text-white/80">{f.path}</span>: {f.files}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Primary Goal</h4>
                      <p>{note.primaryGoal}</p>
                    </div>

                    {note.phases && (
                      <div className="space-y-4 pt-2 border-t border-white/5">
                        <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Implementation Phases</h4>
                        <div className="space-y-6">
                          {note.phases.map((phase, pIdx) => (
                            <div key={pIdx} className="space-y-2 p-3 bg-white/5 rounded-lg border border-white/5">
                              <div className="flex items-center justify-between">
                                <h5 className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{phase.title}</h5>
                              </div>
                              <p className="text-[11px] text-white/60 italic">{phase.goal}</p>
                              
                              <div className="grid grid-cols-1 gap-3 mt-2">
                                <div className="space-y-1">
                                  <span className="text-[9px] font-bold text-cyan-400/60 uppercase tracking-tighter">Files</span>
                                  <div className="flex flex-wrap gap-1">
                                    {phase.files.map((f, fIdx) => (
                                      <span key={fIdx} className="px-1.5 py-0.5 bg-black/20 rounded text-[9px] font-mono text-white/40 border border-white/5">{f}</span>
                                    ))}
                                  </div>
                                </div>

                                {phase.constraints && (
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-amber-400/60 uppercase tracking-tighter">Constraints</span>
                                    <ul className="list-disc list-inside text-[10px] text-white/40 space-y-0.5 ml-1">
                                      {phase.constraints.map((c, cIdx) => (
                                        <li key={cIdx}>{c}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {phase.successCriteria && (
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-tighter">Success Criteria</span>
                                    <ul className="list-disc list-inside text-[10px] text-white/40 space-y-0.5 ml-1">
                                      {phase.successCriteria.map((s, sIdx) => (
                                        <li key={sIdx}>{s}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {phase.completionNote && (
                                  <div className="space-y-2 mt-2 p-2 bg-emerald-500/5 border border-emerald-500/20 rounded">
                                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-tighter">Phase Completion Note</span>
                                    <div className="space-y-2">
                                      <div className="space-y-1">
                                        <span className="text-[8px] font-bold text-emerald-400/60 uppercase tracking-tighter">Achieved</span>
                                        <ul className="list-disc list-inside text-[10px] text-white/60 space-y-0.5 ml-1">
                                          {phase.completionNote.achieved.map((a, aIdx) => (
                                            <li key={aIdx}>{a}</li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div className="space-y-1">
                                        <span className="text-[8px] font-bold text-amber-400/60 uppercase tracking-tighter">Deferred</span>
                                        <ul className="list-disc list-inside text-[10px] text-white/60 space-y-0.5 ml-1">
                                          {phase.completionNote.deferred.map((d, dIdx) => (
                                            <li key={dIdx}>{d}</li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div className="space-y-1">
                                        <span className="text-[8px] font-bold text-cyan-400/60 uppercase tracking-tighter">Phase 3 Implications</span>
                                        <p className="text-[10px] text-white/60 leading-relaxed italic">{phase.completionNote.phase3Implications}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-1">
                      <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Notes</h4>
                      {note.notes ? (
                        <div className="space-y-2">
                          <p className="text-[10px] text-white/60 leading-relaxed italic">{note.notes}</p>
                          <p className="italic opacity-40 text-[9px]">This entry is a development note and not a canonical schema requirement.</p>
                        </div>
                      ) : (
                        <p className="italic opacity-80 text-[10px]">This entry is a development note and not a canonical schema requirement.</p>
                      )}
                    </div>

                  </div>
                </div>
              </ManualDrawer>
            </div>
          ))}
        </div>
      </div>
    </ManualSectionDrawer>
  );
};
