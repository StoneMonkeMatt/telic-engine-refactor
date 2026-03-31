
const fs = require('fs');
const content = fs.readFileSync('src/logic/library.ts', 'utf8');

// Extract symbols array
const symbolsMatch = content.match(/symbols: \[([\s\S]*?)\],/);
if (!symbolsMatch) {
    console.error("Could not find symbols array");
    process.exit(1);
}
const symbolsText = symbolsMatch[1];
const symbolGlyphs = new Set();
const symbolRegex = /glyph: "(.*?)"/g;
let match;
while ((match = symbolRegex.exec(symbolsText)) !== null) {
    symbolGlyphs.add(match[1]);
}

// Extract domains object
const domainsMatch = content.match(/domains: \{([\s\S]*?)\},/);
if (!domainsMatch) {
    console.error("Could not find domains object");
    process.exit(1);
}
const domainsText = domainsMatch[1];
const domainGlyphs = new Set();
const domainRegex = /"([^"]+)"/g;
// We need to be careful here as domain names are also strings.
// A better way is to look at the arrays.
const domainArrayRegex = /: \[([\s\S]*?)\]/g;
while ((match = domainArrayRegex.exec(domainsText)) !== null) {
    const glyphs = match[1].match(/"([^"]+)"/g);
    if (glyphs) {
        glyphs.forEach(g => domainGlyphs.add(g.replace(/"/g, '')));
    }
}

console.log("Missing glyphs in symbols array:");
domainGlyphs.forEach(g => {
    if (!symbolGlyphs.has(g)) {
        console.log(g);
    }
});
