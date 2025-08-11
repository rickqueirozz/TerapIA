import { GoogleGenerativeAI } from "@google/generative-ai";
import { logger } from "../logger.js";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  logger.warn(
    "GEMINI_API_KEY is not set. The chat endpoint will return fallback responses."
  );
}

let genAI = null;
if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}

export async function generateTherapyResponse({
  userMessage,
  triage,
  history,
}) {
  if (!genAI) {
    return {
      text: "No momento não consigo responder via IA. Tente novamente mais tarde e, se for uma situação urgente, busque ajuda profissional. 📞",
    };
  }

  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
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
}
