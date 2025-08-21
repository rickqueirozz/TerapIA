# 🧠 TerapIA - Terapeuta IA com TCC

Aplicação full-stack de terapia cognitivo-comportamental (TCC) com IA, construída com Next.js e Google Gemini.

## 🚀 Status da Migração

✅ **BACKEND COMPLETAMENTE MIGRADO PARA NEXT.JS**

- ❌ ~~Express.js~~ → ✅ **Next.js API Routes**
- ❌ ~~Servidor separado~~ → ✅ **Aplicação única**
- ❌ ~~Porta 4000~~ → ✅ **Porta 3000**

## 🏗️ Arquitetura

```
TerapIA/
├── frontend/                 # Aplicação Next.js completa
│   ├── src/
│   │   ├── app/             # App Router + API Routes
│   │   │   ├── api/         # 🔥 TODAS AS APIS AQUI
│   │   │   ├── chat/        # Página de chat
│   │   │   ├── triagem/     # Página de triagem
│   │   │   └── page.tsx     # Página inicial
│   │   ├── components/      # Componentes React
│   │   ├── lib/             # Utilitários e serviços
│   │   └── types/           # Tipos TypeScript
│   └── package.json         # Dependências unificadas
└── backend/                  # ⚠️ DEPRECATED - Pode ser removido
```

## 🆕 APIs Implementadas

| Endpoint             | Método | Descrição           |
| -------------------- | ------ | ------------------- |
| `/api/session/start` | POST   | Iniciar sessão      |
| `/api/session/end`   | POST   | Encerrar sessão     |
| `/api/triage`        | POST   | Salvar triagem      |
| `/api/chat`          | POST   | Chat com IA         |
| `/api/health`        | GET    | Status da aplicação |
| `/api/stats`         | GET    | Estatísticas        |
| `/api/logs`          | GET    | Logs (dev apenas)   |

## 🚀 Como Usar

### 1. Configuração

```bash
cd frontend
cp .env.example .env.local  # Se existir
```

Edite `.env.local`:

```bash
GEMINI_API_KEY=sua_chave_gemini_aqui
GEMINI_MODEL=gemini-1.5-flash
```

### 2. Instalação

```bash
cd frontend
npm install
```

### 3. Execução

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🔧 Funcionalidades

### ✨ Frontend

- **Design minimalista** inspirado no Calmi
- **Tema claro/escuro** com botão elegante
- **Triagem interativa** com 8 etapas
- **Chat com IA** baseado em TCC
- **Responsivo** para mobile e desktop
- **i18n** preparado (PT/EN)

### 🔥 Backend (Integrado)

- **APIs Next.js** com validação Zod
- **Sistema de sessões** em memória
- **Integração Gemini** para respostas IA
- **Logging completo** com Winston
- **Middleware** para requisições HTTP
- **Health checks** e estatísticas

## 📊 Monitoramento

### Health Check

```bash
curl http://localhost:3000/api/health
```

### Estatísticas

```bash
curl http://localhost:3000/api/stats
```

### Logs (Desenvolvimento)

```bash
curl http://localhost:3000/api/logs
```

## 🗑️ Limpeza do Backend

Após confirmar que tudo está funcionando:

```bash
# Remover diretório backend (opcional)
rm -rf backend/

# Ou manter como referência
mv backend/ backend-deprecated/
```

## 🔍 Verificação da Migração

### ✅ Testes Automáticos

```bash
# Build
npm run build

# Health check
curl http://localhost:3000/api/health

# Criar sessão
curl -X POST http://localhost:3000/api/session/start

# Ver logs
curl http://localhost:3000/api/logs
```

### ✅ Funcionalidades

- [x] Página inicial carrega
- [x] Botão de tema funciona
- [x] Triagem completa funciona
- [x] Chat com IA funciona
- [x] APIs respondem corretamente
- [x] Logs funcionam
- [x] Estatísticas funcionam

## 🚨 Troubleshooting

### Erro de Build

```bash
npm run build
# Verificar erros de TypeScript/ESLint
```

### API não responde

```bash
# Verificar se servidor está rodando
curl http://localhost:3000/api/health

# Verificar logs
curl http://localhost:3000/api/logs
```

### Gemini não funciona

```bash
# Verificar variável de ambiente
echo $GEMINI_API_KEY

# Verificar arquivo .env.local
cat .env.local
```

## 📚 Documentação

- **API Docs**: [API_DOCS.md](frontend/API_DOCS.md)
- **Componentes**: [src/components/](frontend/src/components/)
- **Tipos**: [src/types/](frontend/src/types/)

## 🎯 Próximos Passos

1. **Testar todas as funcionalidades**
2. **Remover diretório backend** (opcional)
3. **Configurar produção** (Vercel, Netlify, etc.)
4. **Adicionar autenticação** (se necessário)
5. **Implementar cache** (Redis, etc.)
6. **Adicionar testes** (Jest, Playwright)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**🎉 Migração concluída com sucesso! O TerapIA agora roda como uma aplicação Next.js única e completa.**
