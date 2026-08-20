# Before You Go

Before You Go is a web application for managing the items and tasks you need before heading out, organized as purpose-specific checklists.

Create tasksets such as "Before Work" or "Before a Trip" and group the relevant tasks in each one. The application is designed to reduce the effort of planning the same routine repeatedly and help prevent forgotten items.

## Features

- View taskset lists and details
- Search tasksets by title and description
- Create tasksets with a title and description
- View tasks associated with a taskset
- Backend API for taskset run history
- Responsive layout for desktop, tablet, and mobile devices

## Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Material Design Icons

### Backend

- Python 3.13
- FastAPI
- Uvicorn
- Psycopg 2
- Pydantic

### Database / Infrastructure

- PostgreSQL (Supabase)
- Routing configuration for Vercel

## Architecture

The frontend taskset feature is divided into the following layers by responsibility:

```text
presentation    UI components
application     Use cases
domain          Types and domain models
infrastructure  API communication
```

The main project structure is shown below:

```text
beforeyougo/
├── frontend/                 # Next.js application
│   └── src/
│       ├── app/              # Pages and shared UI
│       ├── features/         # Feature-specific code
│       └── shared/           # API client and shared utilities
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── main.py
│   │   ├── db.py
│   │   └── routers/
│   └── sql/                  # Schema and seed data
└── vercel.json
```

## Local Development

### Prerequisites

- Node.js 20.19.6 or later
- Python 3.13
- A PostgreSQL database

### 1. Clone the repository

```bash
git clone git@github.com:c-nakashima/beforeyougo.git
cd beforeyougo
```

### 2. Set up the database

Run the following files in order using PostgreSQL or the Supabase SQL Editor:

```text
backend/sql/schema.sql
backend/sql/seed.sql (optional sample data)
```

### 3. Start the backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Update `DATABASE_URL` in `backend/.env` to match your database:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

Start FastAPI:

```bash
uvicorn app.main:app --reload --port 8000
```

The interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

### 4. Start the frontend

Open another terminal and run:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Open the following URL in your browser:

```text
http://localhost:3000
```

The API URL for local development should be:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/backend
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/backend/tasksets` | Retrieve all tasksets |
| POST | `/api/backend/tasksets` | Create a taskset |
| GET | `/api/backend/tasksets/{taskset_id}` | Retrieve a taskset and its tasks |
| POST | `/api/backend/tasksets/{taskset_id}/tasks` | Add a task to a taskset |
| POST | `/api/backend/tasksets/{taskset_id}/runs` | Start a taskset run |
| GET | `/api/backend/tasksets/history` | Retrieve taskset run history |

## Quality Checks

Run the frontend linter:

```bash
cd frontend
npm run lint
```

Verify the production build:

```bash
npm run build
```

## Roadmap

- UI for adding, editing, and deleting tasks
- Persisted completion states and a taskset run screen
- Taskset editing and deletion
- Automated tests
- Authentication and per-user data management
