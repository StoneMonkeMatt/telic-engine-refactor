import { useMemo } from 'react';
import { Codex } from '../logic/codex';
import { OntologyField } from '../types';

/**
 * Hook to filter ontology fields based on a search query.
 * Searches through field names, descriptions, domain names, and symbol meanings.
 */
export function useFilteredOntologyFields(codex: Codex, searchQuery: string) {
  return useMemo(() => {
    if (!searchQuery) return codex.symbols.ontology_fields;
    const q = searchQuery.toLowerCase();
    
    return codex.symbols.ontology_fields?.map(field => {
      const fieldMatches = field.name.toLowerCase().includes(q) || field.description.toLowerCase().includes(q);
      
      const filteredDomains = field.domains.filter(domain => {
        const domainMatches = domain.toLowerCase().includes(q);
        if (domainMatches) return true;
        
        const glyphs = codex.symbols.domains[domain] as string[] || [];
        return glyphs.some(glyph => {
          const s = codex.getSymbol(glyph);
          return s && (s.glyph.toLowerCase().includes(q) || s.meaning.toLowerCase().includes(q));
        });
      });
      
      if (fieldMatches || filteredDomains.length > 0) {
        return {
          ...field,
          domains: fieldMatches ? field.domains : filteredDomains
        };
      }
      return null;
    }).filter((f): f is OntologyField => f !== null);
  }, [searchQuery, codex]);
}
