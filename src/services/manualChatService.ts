import { GoogleGenAI } from "@google/genai";
import { AIConfig } from "../types";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export async function chatWithManual(
  messages: ChatMessage[],
  manualContext: string,
  config: AIConfig
): Promise<string> {
  if (!config.apiKey) {
    throw new Error("API Key is required for the Manual Expert Chat.");
  }

  // Truncate conversation history to last 10 messages to prevent excessively large prompts
  const recentMessages = messages.slice(-10);
  
  const systemInstruction = `You are "The Compass Expert", a high-level AI specialist in the field of symbolic simulation and semantic distillation. 
Your knowledge base is strictly defined by "The Compass Build Manual" provided below.

GOALS:
1. Accurately answer user questions about simulation parameters, metrics, ontology, and dynamics.
2. Provide technical explanations based on the Unified Equation and symbolic lifecycle.
3. Help users understand how to optimize their simulations.

CONSTRAINTS:
- Use the provided manual context as your primary source of truth.
- If a question is outside the scope of the manual, politely state that you are an expert on The Compass and can only answer related questions.
- Maintain a professional, technical, yet accessible tone.
- Use Markdown for formatting (bolding, lists, etc.).

MANUAL CONTEXT:
${manualContext}

CURRENT CONVERSATION:
${recentMessages.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n')}
`;

  if (config.provider === 'gemini') {
    const ai = new GoogleGenAI({ apiKey: config.apiKey });
    const response = await ai.models.generateContent({
      model: config.model || "gemini-3-flash-preview",
      contents: [{
        role: "user",
        parts: [{ text: systemInstruction }]
      }],
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  }

  // For other providers, we'd use the proxy as in aiService.ts
  // But since the user mentioned "same ai selection", and Gemini is the default/primary, 
  // I'll focus on Gemini first and add proxy support if needed.
  
  if (['openai', 'grok', 'deepseek', 'anthropic'].includes(config.provider)) {
     const response = await fetch("/api/proxy", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider: config.provider,
        apiKey: config.apiKey,
        model: config.model,
        prompt: systemInstruction
      })
    });

    if (!response.ok) {
       throw new Error(`${config.provider} proxy error: ${response.statusText}`);
    }

    const data = await response.json();
    if (config.provider === 'anthropic') {
        return data.content[0].text;
    } else {
        return data.choices[0].message.content;
    }
  }

  return "Unsupported AI provider for chat.";
}
