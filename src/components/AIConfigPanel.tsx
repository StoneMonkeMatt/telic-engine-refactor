import React from 'react';
import { Cpu, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AIConfig, AIProvider } from '../types';
import { cn } from '../lib/utils';

interface AIConfigPanelProps {
  isAiConfigOpen: boolean;
  setIsAiConfigOpen: (val: boolean) => void;
  aiConfig: AIConfig;
  setAiConfig: (config: AIConfig) => void;
}

export function AIConfigPanel({
  isAiConfigOpen,
  setIsAiConfigOpen,
  aiConfig,
  setAiConfig
}: AIConfigPanelProps) {
  return (
    <section className="glass-panel overflow-hidden">
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
  );
}
