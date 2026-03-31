import { GoogleGenAI, Type } from "@google/genai";
import { Symbol, AIConfig, DistillationResult, AIDiagnostic } from "../types";

export async function distillTextToSymbols(
  text: string, 
  availableSymbols: Symbol[], 
  config: AIConfig
): Promise<DistillationResult> {
  const startTime = Date.now();
  const validGlyphs = new Set(availableSymbols.map(s => s.glyph));
  const symbolMap = availableSymbols.map(s => `${s.glyph}: ${s.meaning}`).join(', ');
  
  const prompt = `You are a high-fidelity semantic distillation engine. 
Your goal is to extract the core symbolic essence from the provided text.

ONTOLOGY (Glyph: Meaning):
${symbolMap}

INSTRUCTIONS:
1. Read the input text carefully. If it is very long, focus on the overall narrative arc and recurring themes.
2. Identify the fundamental narrative arc, emotional core, and logical structure.
3. Map these elements to a sequence of EXACTLY 5 to 10 symbols from the ontology above.
4. Prioritize symbols that represent the "telos" or ultimate direction of the meaning.
5. Return ONLY a JSON array of strings containing the glyphs. Do not include any other text or explanation.

INPUT TEXT:
${text.substring(0, 100000)}`;

  const createDiagnostic = (response: string, success: boolean, error?: string): AIDiagnostic => ({
    provider: config.provider,
    model: config.model || (config.provider === 'gemini' ? "gemini-3-flash-preview" : ""),
    prompt: prompt,
    response: response,
    latency: Date.now() - startTime,
    timestamp: Date.now(),
    success: success,
    error: error,
    seed: config.seed
  });

  if (config.provider === 'gemini') {
    const apiKey = config.apiKey || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : undefined);
    
    if (!apiKey) {
      throw new Error("Gemini API Key is required. Please provide it in settings or ensure GEMINI_API_KEY is set in the environment.");
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: config.model || "gemini-3-flash-preview",
        contents: [{
          role: "user",
          parts: [{ text: prompt }]
        }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          temperature: 0.2,
          seed: config.seed
        }
      });

      const result = JSON.parse(response.text);
      const symbols = Array.isArray(result) ? result.filter(glyph => validGlyphs.has(glyph)) : [];
      return {
        symbols,
        diagnostic: createDiagnostic(response.text, true)
      };
    } catch (e: any) {
      console.error("Failed to parse Gemini response:", e);
      return {
        symbols: [],
        diagnostic: createDiagnostic("", false, e.message)
      };
    }
  }

  // Generic OpenAI-compatible fetch for OpenAI, Grok, DeepSeek via local proxy
  if (config.provider === 'openai' || config.provider === 'grok' || config.provider === 'deepseek') {
    try {
      const response = await fetch("/api/proxy", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: config.provider,
          apiKey: config.apiKey,
          model: config.model,
          prompt: prompt,
          responseFormat: 'json_object',
          seed: config.seed
        })
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = "";
        if (contentType && contentType.includes("application/json")) {
          const err = await response.json();
          errorMessage = err.error?.message || `${config.provider} request failed: ${response.statusText}`;
        } else {
          const text = await response.text();
          console.error(`${config.provider} non-JSON error:`, text);
          errorMessage = `${config.provider} proxy error: ${response.statusText}. The server might not be configured correctly for Vercel.`;
        }
        return {
          symbols: [],
          diagnostic: createDiagnostic("", false, errorMessage)
        };
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      const parsed = JSON.parse(content);
      const result = Array.isArray(parsed) ? parsed : (parsed.symbols || parsed.glyphs || Object.values(parsed)[0]);
      const symbols = Array.isArray(result) ? result.filter(glyph => validGlyphs.has(glyph)) : [];
      
      return {
        symbols,
        diagnostic: createDiagnostic(content, true)
      };
    } catch (e: any) {
      console.error(`Failed to parse ${config.provider} response:`, e);
      return {
        symbols: [],
        diagnostic: createDiagnostic("", false, e.message)
      };
    }
  }

  if (config.provider === 'anthropic') {
    try {
      const response = await fetch("/api/proxy", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'anthropic',
          apiKey: config.apiKey,
          model: config.model,
          prompt: prompt,
          responseFormat: 'json_object'
        })
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = "";
        if (contentType && contentType.includes("application/json")) {
          const err = await response.json();
          errorMessage = err.error?.message || "Anthropic request failed";
        } else {
          const text = await response.text();
          console.error("Anthropic non-JSON error:", text);
          errorMessage = `Anthropic proxy error: ${response.statusText}. The server might not be configured correctly for Vercel.`;
        }
        return {
          symbols: [],
          diagnostic: createDiagnostic("", false, errorMessage)
        };
      }

      const data = await response.json();
      const content = data.content[0].text;
      const match = content.match(/\[.*\]/s);
      const result = JSON.parse(match ? match[0] : content);
      const symbols = Array.isArray(result) ? result.filter(glyph => validGlyphs.has(glyph)) : [];
      
      return {
        symbols,
        diagnostic: createDiagnostic(content, true)
      };
    } catch (e: any) {
      console.error("Failed to parse Anthropic response:", e);
      return {
        symbols: [],
        diagnostic: createDiagnostic("", false, e.message)
      };
    }
  }

  return { symbols: [] };
}
