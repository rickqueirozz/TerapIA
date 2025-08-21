import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "./config";

let genAI: GoogleGenerativeAI | null = null;

if (config.gemini.apiKey) {
  genAI = new GoogleGenerativeAI(config.gemini.apiKey);
}

export async function generateTherapyResponse({
  userMessage,
  triage,
  history = [],
}: {
  userMessage: string;
  triage: Record<string, unknown> | null;
  history?: Array<{ role: string; content: string }>;
}) {
  if (!genAI) {
    return {
      text: "No momento não consigo responder via IA. Tente novamente mais tarde e, se for uma situação urgente, busque ajuda profissional. 📞",
    };
  }

  const model = genAI.getGenerativeModel({
    model: config.gemini.model,
  });

  const systemPreamble = `Você é um terapeuta virtual baseado em TCC (Terapia Cognitivo-Comportamental).
- Mantenha um tom acolhedor, claro e respeitoso.
- Não forneça diagnósticos. Sugira estratégias de TCC: reestruturação cognitiva, técnicas de respiração, registro de pensamentos, psicoeducação.
- Se houver risco (ideação suicida/autolesão), recomende ajuda imediata e serviços de emergência locais.
- Use respostas curtas (2-5 frases) e faça perguntas abertas quando apropriado.
`;

  const triageContext = triage
    ? `\nContexto de triagem do usuário: ${JSON.stringify(triage)}`
    : "";

  const convo = [
    { role: "user", parts: [{ text: `${systemPreamble}${triageContext}` }] },
    ...history.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  try {
    const result = await model.generateContent({ contents: convo });
    const response =
      result.response?.text?.() ||
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";
    return {
      text:
        response ||
        "Desculpe, não consegui gerar uma resposta agora. Vamos tentar novamente?",
    };
  } catch (error) {
    console.error("Error generating response:", error);
    return {
      text: "Desculpe, ocorreu um erro ao gerar a resposta. Tente novamente.",
    };
  }
} 