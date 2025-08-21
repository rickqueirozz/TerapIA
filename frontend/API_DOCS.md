# 📚 Documentação das APIs - TerapIA

## 🌐 Visão Geral

Todas as APIs estão integradas no Next.js e rodam na mesma porta do frontend (3000).

## 🔑 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# Gemini AI (obrigatório)
GEMINI_API_KEY=sua_chave_gemini_aqui
GEMINI_MODEL=gemini-1.5-flash

# App (opcional)
NEXT_PUBLIC_APP_NAME=TerapIA
```

## 📡 Endpoints

### 🔴 Sessões

#### `POST /api/session/start`

Inicia uma nova sessão de terapia.

**Response (201):**

```json
{
  "sessionId": "uuid-da-sessao"
}
```

#### `POST /api/session/end`

Encerra uma sessão existente.

**Request Body:**

```json
{
  "sessionId": "uuid-da-sessao"
}
```

**Response (204):** Sem conteúdo

### 🟡 Triagem

#### `POST /api/triage`

Salva os dados de triagem do usuário.

**Request Body:**

```json
{
  "sessionId": "uuid-da-sessao",
  "answers": {
    "feelingToday": "Ansioso",
    "feelingOtherText": "Texto adicional se 'Outro'",
    "hadTherapyBefore": true,
    "therapyDuration": "6 meses",
    "reasons": ["Ansiedade", "Depressão"],
    "reasonsOtherText": "Texto adicional se 'Outro'",
    "takingMeds": false,
    "medsWhich": "Nome dos medicamentos",
    "selfHarmThoughts": false,
    "overwhelmFrequency": "Às vezes",
    "hasSomeoneToTalk": true,
    "age": 25
  }
}
```

**Response (201):**

```json
{
  "ok": true
}
```

### 🟢 Chat

#### `POST /api/chat`

Envia uma mensagem para o terapeuta IA.

**Request Body:**

```json
{
  "sessionId": "uuid-da-sessao",
  "message": "Estou me sentindo ansioso hoje"
}
```

**Response (200):**

```json
{
  "reply": "Entendo que você está se sentindo ansioso..."
}
```

### 🔵 Monitoramento

#### `GET /api/health`

Verifica o status da aplicação.

**Response (200):**

```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "app": "TerapIA",
  "version": "1.0.0",
  "environment": "development",
  "memory": {
    "rss": 45,
    "heapUsed": 23,
    "heapTotal": 34
  }
}
```

#### `GET /api/stats`

Estatísticas das sessões ativas.

**Response (200):**

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "totalSessions": 15,
  "activeSessions": 8,
  "sessionsWithTriage": 6,
  "sessionsWithMessages": 4,
  "totalMessages": 23,
  "averageMessagesPerSession": 2.88
}
```

#### `GET /api/logs` (Apenas Desenvolvimento)

Visualiza logs da aplicação.

**Query Parameters:**

- `level`: Filtro por nível (error, warn, info, debug)
- `limit`: Número máximo de logs (padrão: 50)

**Response (200):**

```json
{
  "logs": [...],
  "total": 25,
  "level": "info",
  "limit": 50
}
```

## 🚨 Códigos de Erro

| Código | Descrição                          |
| ------ | ---------------------------------- |
| 400    | Dados inválidos ou sessão inválida |
| 403    | Acesso negado (logs em produção)   |
| 500    | Erro interno do servidor           |

## 📊 Validação

Todas as APIs usam **Zod** para validação:

- **sessionId**: UUID válido
- **message**: 1-2000 caracteres
- **age**: 1-120 anos
- **reasons**: Array não vazio
- **overwhelmFrequency**: Enum válido

## 🔍 Logging

### Níveis de Log

- **ERROR**: Erros críticos
- **WARN**: Avisos e tentativas inválidas
- **INFO**: Operações bem-sucedidas
- **DEBUG**: Informações detalhadas

### Logs Automáticos

- Todas as requisições HTTP
- Criação/encerramento de sessões
- Processamento de triagem e chat
- Erros de validação

## 🧹 Limpeza Automática

- **Sessões**: Limpas após 24h de inatividade
- **Logs**: Mantidos apenas os últimos 1000
- **Memória**: Limpeza a cada hora

## 🚀 Como Usar

### 1. Iniciar Sessão

```javascript
const response = await fetch("/api/session/start", { method: "POST" });
const { sessionId } = await response.json();
```

### 2. Salvar Triagem

```javascript
await fetch("/api/triage", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ sessionId, answers }),
});
```

### 3. Enviar Mensagem

```javascript
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ sessionId, message }),
});
const { reply } = await response.json();
```

## 🔧 Desenvolvimento

### Rodar Localmente

```bash
npm run dev
```

### Build de Produção

```bash
npm run build
npm start
```

### Verificar Logs

```bash
curl http://localhost:3000/api/logs
```

### Health Check

```bash
curl http://localhost:3000/api/health
```

## 📝 Notas

- Todas as APIs são **stateless** (exceto sessões em memória)
- **CORS** configurado automaticamente pelo Next.js
- **Rate limiting** pode ser adicionado via middleware
- **Autenticação** pode ser implementada via middleware
- **Cache** pode ser configurado via Next.js
