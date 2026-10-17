# 🏛️ LAWgic — Making India's Legal System Understandable

**LAWgic** is a multilingual AI-powered legal information and document-understanding platform for Indian citizens. Built with production-grade architecture from day one.

> **Status**: Foundation phase — core architecture established, feature development upcoming.

---

## 🌟 What LAWgic Does (Vision)

1. **Legal Document Decoder** — Upload a court order, notice, or agreement and receive a plain-language explanation with source citations
2. **Legal Rights Assistant** — Ask questions about Indian law and receive grounded, cited answers
3. **Case Status Tracker** — Track your legal case journey
4. **Pro-bono Community** — Connect with verified legal professionals
5. **Public Legal Data Navigator** — Explore legislation, regulations, and judgments

---

## 🏗️ Architecture

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Next.js Web    │────▶│  NestJS API       │────▶│  FastAPI AI      │
│   (apps/web)     │     │  (apps/api)       │     │  (apps/ai-service│
│   Port 3000      │     │  Port 3001        │     │  Port 8001       │
└──────────────────┘     └─────────┬────────┘     └──────────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
             ┌──────▼──────┐ ┌────▼────┐  ┌─────▼─────┐
             │  PostgreSQL  │ │  Redis  │  │  Worker   │
             │  + pgvector  │ │ BullMQ  │  │ (apps/    │
             │  + RLS       │ │         │  │  worker)  │
             └─────────────┘ └─────────┘  └───────────┘
```

### Services

| Service | Technology | Port | Purpose |
|---------|-----------|------|---------|
| `apps/web` | Next.js 15, TypeScript, Tailwind | 3000 | User interface |
| `apps/api` | NestJS, TypeScript | 3001 | Business logic, auth, API |
| `apps/ai-service` | FastAPI, Python 3.11 | 8001 | AI/ML processing |
| `apps/worker` | TypeScript, BullMQ | — | Async job processing |

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 22.0.0 | [nodejs.org](https://nodejs.org) |
| pnpm | ≥ 12.0.0 | `npm install -g pnpm` |
| Python | ≥ 3.11 | [python.org](https://python.org) |
| Docker | Latest | [docker.com](https://docker.com) — for local PostgreSQL + Redis |

### 1. Clone and Install

```bash
git clone https://github.com/your-org/lawgic.git
cd lawgic
pnpm install
```

### 2. Set Up Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit with your values (see below for required variables)
# MINIMUM required for local development:
# - SUPABASE_URL
# - SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
# - SUPABASE_JWT_SECRET
# - AI_SERVICE_API_KEY (generate: openssl rand -hex 32)
```

Also copy for Next.js:
```bash
cp .env.example apps/web/.env.local
```

And for the AI service:
```bash
cp .env.example apps/ai-service/.env
```

### 3. Start Infrastructure (Docker)

```bash
# Start PostgreSQL + pgvector and Redis
docker compose up -d

# Verify they're running
docker compose ps
```

> **No Docker?** Use [Supabase](https://supabase.com) (free tier) for PostgreSQL and [Upstash](https://upstash.com) (free tier) for Redis.

### 4. Run Database Migrations

```bash
# Apply core schema + RLS policies to your database
# (Supabase users: run these in the SQL editor)
psql $DATABASE_URL -f infrastructure/database/migrations/001_core_schema.sql
psql $DATABASE_URL -f infrastructure/database/migrations/002_rls_policies.sql
```

### 5. Set Up Python AI Service

```bash
cd apps/ai-service
pip install uv
uv pip install -e ".[dev]" --system
cd ../..
```

### 6. Start Development Servers

```bash
# All services simultaneously (requires tmux or separate terminals)
pnpm dev:api      # NestJS API on :3001
pnpm dev:web      # Next.js on :3000

# In another terminal:
cd apps/ai-service && uvicorn app.main:app --reload --port 8001

# In another terminal:
pnpm dev:worker   # Background job processor
```

### 7. Verify

- **Web**: http://localhost:3000
- **API Health**: http://localhost:3001/api/v1/health
- **API Docs**: http://localhost:3001/api/v1/docs
- **AI Service Health**: http://localhost:8001/api/v1/health

---

## 📁 Repository Structure

```
lawgic/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/                # App router pages
│   │   ├── features/           # Feature modules (documents, cases, auth...)
│   │   ├── components/         # Shared UI components
│   │   ├── lib/                # Utilities (Supabase client, API client)
│   │   └── hooks/              # Custom React hooks
│   │
│   ├── api/                    # NestJS REST API
│   │   └── src/
│   │       ├── modules/
│   │       │   ├── auth/       # Supabase JWT strategy, guards, decorators
│   │       │   ├── documents/  # Document upload, management
│   │       │   ├── users/      # User profiles
│   │       │   ├── analyses/   # Document analysis results
│   │       │   ├── conversations/ # Legal Q&A
│   │       │   ├── cases/      # Case tracking
│   │       │   ├── legal/      # Legal sources
│   │       │   ├── audit/      # Audit logging
│   │       │   └── health/     # Health checks
│   │       ├── common/
│   │       │   ├── storage/    # Storage abstraction (local/S3)
│   │       │   ├── queue/      # BullMQ queue registration
│   │       │   ├── redis/      # Redis module
│   │       │   ├── filters/    # Exception filter (safe error responses)
│   │       │   └── interceptors/ # Request ID, logging
│   │       ├── database/       # PostgreSQL module, migrations runner
│   │       └── config/         # Config & environment validation
│   │
│   ├── ai-service/             # Python FastAPI AI service
│   │   └── app/
│   │       ├── api/v1/         # Endpoints (ocr, embeddings, llm, translation)
│   │       ├── core/           # Config, logging, security
│   │       └── services/
│   │           ├── llm/        # LLM abstraction + Gemini provider
│   │           ├── ocr/        # OCR abstraction
│   │           ├── embeddings/ # Embedding abstraction
│   │           └── translation/ # Translation abstraction
│   │
│   └── worker/                 # BullMQ job processors
│       └── src/
│           ├── processors/     # document.processor, delete.processor
│           └── main.ts         # Worker bootstrap
│
├── packages/
│   ├── types/                  # Shared TypeScript types (domain + AI abstractions)
│   ├── validation/             # Shared Zod schemas
│   └── config/                 # Shared constants (queues, rate limits)
│
├── infrastructure/
│   └── database/
│       └── migrations/
│           ├── 001_core_schema.sql    # All tables + indexes
│           └── 002_rls_policies.sql   # Row-Level Security
│
├── docs/
│   ├── architecture/           # Architecture overview
│   └── decisions/              # ADR-001 through ADR-006
│
├── .github/workflows/ci.yml    # CI: type check, lint, test, security scan
├── .env.example                # All environment variables documented
├── .gitignore                  # Never commits: .env, uploads, credentials
├── docker-compose.yml          # Local PostgreSQL + Redis
├── pnpm-workspace.yaml         # Monorepo workspace definition
└── tsconfig.base.json          # Strict TypeScript base config
```

---

## 🔒 Security Architecture

Security is a first-class requirement. LAWgic will handle sensitive personal and legal documents.

### Three-Layer Authorization

```
1. Authentication    → Supabase JWT (verified cryptographically)
2. Application Auth  → NestJS Guards (server-side role + ownership checks)
3. Database RLS      → PostgreSQL Row-Level Security (database-level isolation)
```

### Key Security Properties

- ✅ **No secrets in code** — all secrets via environment variables
- ✅ **No user-provided filenames as paths** — path traversal prevention
- ✅ **Presigned URLs only** — documents never transit through API
- ✅ **No PII in logs** — logs contain IDs, never content
- ✅ **No stack traces to clients** — safe error messages only
- ✅ **Prompt injection protection** — document content marked as `DOCUMENT_DATA`
- ✅ **AI output validation** — Zod/Pydantic schemas validate LLM output
- ✅ **Defense in depth** — three independent authorization layers
- ✅ **Data lifecycle** — deletion cleans up ALL derived data

### Security Documentation

See [`docs/decisions/ADR-005-document-privacy.md`](docs/decisions/ADR-005-document-privacy.md)

---

## 🤖 AI Architecture

### LLM Provider Abstraction

Change providers without changing business logic:

```
DEFAULT_LLM_PROVIDER=google_gemini  # or openai, anthropic, local_ollama
```

### Embedding

Uses `multilingual-e5-base` locally (free, supports Indian languages) by default.

### Translation

Abstraction supports Bhashini, Sarvam AI, and NLLB. Switch via env var:
```
TRANSLATION_PROVIDER=bhashini  # or sarvam_ai, local_nllb
```

### RAG + Citation Architecture

Every AI claim is typed as:
- `DOCUMENT_FACT` — what the document actually says (with citation)
- `LEGAL_SOURCE` — what the law says (with citation to legal source)
- `AI_INTERPRETATION` — what it means in plain language
- `SUGGESTED_NEXT_STEP` — what to consider doing

No unsourced legal claims. Every response includes a mandatory disclaimer.

---

## 🧪 Testing

```bash
# TypeScript tests
pnpm test

# With coverage
pnpm test:ci

# Python tests
cd apps/ai-service && pytest tests/ -v

# Type checking
pnpm typecheck
```

---

## 📊 Development Infrastructure Costs

| Service | Provider | Cost |
|---------|---------|------|
| PostgreSQL + pgvector | Supabase free tier | $0 |
| Redis | Upstash free tier | $0 |
| LLM | Gemini 1.5 Flash | ~$0.075/1M tokens |
| Embeddings | Local multilingual-e5-base | $0 |
| OCR | Local Tesseract | $0 |
| Translation | Local NLLB | $0 |
| Frontend hosting | Vercel free tier | $0 |
| **Total** | | **~$0** |

---

## 📚 Architecture Decision Records

| ADR | Decision |
|-----|---------|
| [ADR-001](docs/decisions/ADR-001-postgresql-pgvector.md) | PostgreSQL + pgvector for unified storage |
| [ADR-002](docs/decisions/ADR-002-nestjs-fastapi.md) | NestJS + FastAPI hybrid architecture |
| [ADR-003](docs/decisions/ADR-003-async-processing.md) | Asynchronous document processing |
| [ADR-004](docs/decisions/ADR-004-llm-abstraction.md) | LLM provider abstraction layer |
| [ADR-005](docs/decisions/ADR-005-document-privacy.md) | Document privacy architecture |
| [ADR-006](docs/decisions/ADR-006-rag-citation-strategy.md) | RAG and citation strategy |

---

## 🛣️ Roadmap

- [ ] **Phase 1** (Current): Architecture foundation ✅
- [ ] **Phase 2**: Authentication UI, document upload flow
- [ ] **Phase 3**: OCR pipeline integration
- [ ] **Phase 4**: Document analysis with RAG
- [ ] **Phase 5**: Multilingual support (Bhashini/Sarvam)
- [ ] **Phase 6**: Case tracking feature
- [ ] **Phase 7**: Legal Q&A conversations

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) (coming soon).

---

## 📜 License

Private — Unlicensed. All rights reserved.

---

*LAWgic — Making India's legal system understandable.*
