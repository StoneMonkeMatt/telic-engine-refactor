import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, MessageSquare, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { chatWithManual, ChatMessage } from '../services/manualChatService';
import { AIConfig } from '../types';
import { cn } from '../lib/utils';

interface ManualChatProps {
  config: AIConfig;
  manualContext: string;
}

export function ManualChat({ config, manualContext }: ManualChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithManual([...messages, userMessage], manualContext, config);
      const modelMessage: ChatMessage = { role: 'model', text: response };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = { 
        role: 'model', 
        text: `Error: ${error instanceof Error ? error.message : "Failed to generate response. Please check your AI configuration and API key."}` 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[400px] h-[600px] glass-panel flex flex-col overflow-hidden border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-cyan-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400">Compass Expert</h3>
                  <p className="text-[9px] text-white/40 uppercase tracking-widest">Manual Intelligence</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8">
                  <div className="p-4 bg-white/5 rounded-full">
                    <Sparkles className="w-8 h-8 text-cyan-500/40" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold uppercase tracking-widest text-white/60">Ask the Expert</p>
                    <p className="text-xs text-white/30 leading-relaxed">
                      I have full access to the Build Manual. How can I help you optimize your simulation today?
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-2 w-full pt-4">
                    {[
                      "What is the Unified Equation?",
                      "How does Duality affect the Observer?",
                      "What is the role of the Preserver?",
                      "Explain the Complexity Penalty."
                    ].map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(q)}
                        className="text-[10px] text-left p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all text-white/40 hover:text-white/80"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg shrink-0 h-fit",
                    m.role === 'user' ? "bg-cyan-500/20" : "bg-white/5"
                  )}>
                    {m.role === 'user' ? <User className="w-4 h-4 text-cyan-400" /> : <Bot className="w-4 h-4 text-white/60" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-xs leading-relaxed",
                    m.role === 'user' 
                      ? "bg-cyan-500 text-ocean-950 font-medium rounded-tr-none" 
                      : "bg-white/5 border border-white/10 text-white/80 rounded-tl-none"
                  )}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3 mr-auto">
                  <div className="p-2 bg-white/5 rounded-lg shrink-0">
                    <Bot className="w-4 h-4 text-white/60" />
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin text-cyan-400" />
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Analyzing Manual...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-cyan-500 text-ocean-950 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-4 rounded-2xl shadow-2xl transition-all flex items-center gap-3 group",
          isOpen 
            ? "bg-rose-500 text-white" 
            : "bg-cyan-500 text-ocean-950"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="text-xs font-bold uppercase tracking-widest pr-2">
            Manual Expert
          </span>
        )}
      </motion.button>
    </div>
  );
}
