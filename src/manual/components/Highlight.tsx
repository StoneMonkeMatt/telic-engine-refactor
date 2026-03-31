import React from 'react';

export function Highlight({ text, query }: { text: string, query: string }) {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="bg-cyan-500/30 text-cyan-200 rounded-sm px-0.5">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
}
