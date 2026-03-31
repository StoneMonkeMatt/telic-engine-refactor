import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SearchContext } from './SearchContext';
import { Highlight } from './Highlight';

export function ManualSectionDrawer({ 
  icon: Icon, 
  title, 
  subtitle, 
  children, 
  keywords = "", 
  defaultOpen = false 
}: { 
  icon: any, 
  title: string, 
  subtitle: string, 
  children: React.ReactNode, 
  keywords?: string, 
  defaultOpen?: boolean 
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const searchQuery = React.useContext(SearchContext);

  useEffect(() => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      if (
        title.toLowerCase().includes(searchLower) || 
        subtitle.toLowerCase().includes(searchLower) ||
        keywords.toLowerCase().includes(searchLower)
      ) {
        setIsOpen(true);
      }
    }
  }, [searchQuery, title, subtitle, keywords]);

  return (
    <section className="glass-panel overflow-hidden border-cyan-500/20">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
      >
        <div className="flex items-center gap-4 text-cyan-400">
          <div className="p-3 bg-cyan-500/10 rounded-2xl">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold uppercase tracking-widest">
              <Highlight text={title} query={searchQuery} />
            </h3>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
              <Highlight text={subtitle} query={searchQuery} />
            </p>
          </div>
        </div>
        <ChevronRight className={cn("w-6 h-6 text-white/20 transition-transform shrink-0", isOpen && "rotate-90")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="p-8 pt-0 space-y-6 border-t border-white/5">
              <div className="pt-6">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
