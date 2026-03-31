// src/hooks/useUIState.ts
import { useState, useEffect } from 'react';
import { AIConfig, AIProvider } from '../types';

export function useUIState() {
  const [activeTab, setActiveTab] = useState<'simulation' | 'ontology' | 'metrics' | 'theory' | 'vision' | 'innovations' | 'manual' | 'agents' | 'history'>('simulation');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState("");
  const [isDistilling, setIsDistilling] = useState(false);
  const [distillStatus, setDistillStatus] = useState("");
  const [openDomain, setOpenDomain] = useState<string | null>(null);
  const [openField, setOpenField] = useState<string | null>(null);
  const [ontologyOpenDomain, setOntologyOpenDomain] = useState<string | null>(null);
  const [ontologyOpenField, setOntologyOpenField] = useState<string | null>(null);
  const [isAiConfigOpen, setIsAiConfigOpen] = useState(false);
  const [isBridgesOpen, setIsBridgesOpen] = useState(false);
  const [aiConfig, setAiConfig] = useState<AIConfig>(() => {
    const saved = localStorage.getItem('blue_whale_ai_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...parsed, apiKey: '' };
      } catch (e) { console.error(e); }
    }
    return { provider: 'gemini', apiKey: '', model: '', rememberKey: false };
  });

  useEffect(() => {
    if (aiConfig.rememberKey && aiConfig.apiKey) {
      localStorage.setItem('blue_whale_ai_config', JSON.stringify(aiConfig));
    } else {
      const { apiKey, ...rest } = aiConfig;
      localStorage.setItem('blue_whale_ai_config', JSON.stringify(rest));
    }
  }, [aiConfig]);

  return {
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
  };
}
