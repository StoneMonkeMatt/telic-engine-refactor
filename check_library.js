const fs = require('fs');
const content = fs.readFileSync('src/logic/library.ts', 'utf8');

const symbolsMatch = content.match(/symbols: \[([\s\S]*?)\],/);
const domainsMatch = content.match(/domains: \{([\s\S]*?)\},/);

if (symbolsMatch && domainsMatch) {
  const symbolsText = symbolsMatch[1];
  const domainsText = domainsMatch[1];

  const symbolsInArray = new Set();
  const symbolRegex = /glyph: "([^"]+)"/g;
  let match;
  while ((match = symbolRegex.exec(symbolsText)) !== null) {
    symbolsInArray.add(match[1]);
  }

  const symbolsInDomains = new Set();
  const domainSymbolRegex = /"([^"]+)"/g;
  while ((match = domainSymbolRegex.exec(domainsText)) !== null) {
    if (match[1].length <= 5 || match[1] === "qualia" || match[1] === "intent" || match[1] === "stare" || match[1] === "demos" || match[1] === "Borda" || match[1] === "weave" || match[1] === "sole" || match[1] === "ball" || match[1] === "hue") {
        symbolsInDomains.add(match[1]);
    }
  }

  const missing = [];
  for (const sym of symbolsInDomains) {
    if (!symbolsInArray.has(sym)) {
      missing.push(sym);
    }
  }

  if (missing.length > 0) {
    console.log('Missing symbols in symbols array:', missing);
  } else {
    console.log('All symbols in domains are present in symbols array.');
  }
} else {
  console.log('Could not find symbols or domains.');
}
