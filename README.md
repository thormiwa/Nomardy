# Nomardy

Visa-first travel planning platform for African travelers.

## Workspace

- `frontend`: Next.js app
- `backend`: FastAPI service
- `supabase`: local database config, migrations, and seeds
- `docs`: project notes and architecture placeholders

## Environment

Copy `.env.example` to `.env` at the repo root and fill in the Supabase and API credentials.

## Quick Start

### Frontend

```bash
cd frontend
npm run dev
```

### Backend

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload
```
