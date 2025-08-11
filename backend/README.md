# Backend (Express + Gemini)

## Configuração

1. Copie `.env.example` para `.env` e preencha:

```
PORT=4000
CORS_ORIGIN=http://localhost:3000
GEMINI_API_KEY=...sua_chave...
GEMINI_MODEL=gemini-1.5-flash
```

## Rodar

```
npm run dev
```

## Endpoints
- POST `/api/session/start` → `{ sessionId }`
- POST `/api/session/end` → body `{ sessionId }`
- POST `/api/triage` → body `{ sessionId, answers }`
- POST `/api/chat` → body `{ sessionId, message }`

Logs com `winston` e `morgan`.
