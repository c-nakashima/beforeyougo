CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE tasksets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  taskset_id UUID NOT NULL REFERENCES tasksets(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE taskset_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  taskset_id UUID NOT NULL REFERENCES tasksets(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'wip'
    CHECK (status IN ('wip', 'done', 'cancelled')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE task_run_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  taskset_run_id UUID NOT NULL
    REFERENCES taskset_runs(id) ON DELETE CASCADE,
  task_id UUID
    REFERENCES tasks(id) ON DELETE SET NULL,
  title_snapshot TEXT NOT NULL,
  checked BOOLEAN NOT NULL DEFAULT FALSE,
  checked_at TIMESTAMPTZ
);