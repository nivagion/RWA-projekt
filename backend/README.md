# Recipe Finder (Backend)

Node.js + Express + PostgreSQL REST API (MVP)

## 1) Install
```bash
cd backend
npm install
```

## 2) Setup env
Create `backend/.env` from `.env.example`.

## 3) Create DB + tables
Create the DB (example):
```bash
createdb recipe_finder
```

Run schema + seed:
```bash
psql -d recipe_finder -f src/db/schema.sql
psql -d recipe_finder -f src/db/seed.sql
```

## 4) Run
Dev:
```bash
npm run dev
```

Prod:
```bash
npm start
```

## API
- `GET /api/health`
- `GET /api/recipes`
- `GET /api/recipes/:id`
- `POST /api/recipes`
- `PUT /api/recipes/:id`
- `DELETE /api/recipes/:id`

## Notes
- Uses parameterized SQL queries (`$1, $2, ...`) to avoid SQL injection.
- Error handling is centralized in `src/middleware/errorHandler.js`.
