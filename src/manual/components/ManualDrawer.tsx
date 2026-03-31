import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SearchContext } from './SearchContext';
import { Highlight } from './Highlight';

export function ManualDrawer({ 
  title, 
  children, 
  keywords = "", 
  defaultOpen = false 
}: { 
  title: string | React.ReactNode, 
  children: React.ReactNode, 
  keywords?: string, 
  defaultOpen?: boolean 
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const searchQuery = React.useContext(SearchContext);

  useEffect(() => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const titleString = typeof title === 'string' ? title : '';
      if (
        titleString.toLowerCase().includes(searchLower) ||
        keywords.toLowerCase().includes(searchLower)
      ) {
        setIsOpen(true);
      }
    }
  }, [searchQuery, title, keywords]);

  return (
    <div className="border border-white/5 rounded-xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
      >
        {typeof title === 'string' ? (
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
            <Highlight text={title} query={searchQuery} />
          </span>
        ) : (
          title
        )}
        <ChevronRight className={cn("w-4 h-4 text-white/20 transition-transform shrink-0", isOpen && "rotate-90")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-black/20 border-t border-white/5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
