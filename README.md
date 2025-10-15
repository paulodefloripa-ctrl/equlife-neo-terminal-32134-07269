# EquityLabs Nano Console

Ultra-lightweight operational console built with React + Vite + TypeScript + Tailwind CSS.

## Features

- **Console Interface**: Terminal-style command interface with history and autocomplete
- **Pomodoro Timer**: Built-in focus/break timers via console commands
- **GPS Integration**: Real-time location tracking (requires permission)
- **Project Management**: CRUD operations with Supabase or local mock mode
- **AI Agents Library**: Quick links to external AI services
- **Settings**: Customizable background images and Stripe checkout links

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and fill in your values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_USE_MOCK=true  # Set to 'false' to use Supabase
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. (Optional) Setup Supabase Database

If using Supabase (VITE_USE_MOCK=false), run this SQL in your Supabase SQL Editor:

```sql
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  agent text,
  status text check (status in ('EN_CURSO','PAUSADO','COMPLETADO')) default 'EN_CURSO',
  progress_percent int check (progress_percent between 0 and 100) default 0,
  capital_invested numeric(14,2) default 0,
  time_estimated_days int,
  created_at timestamptz default now()
);

alter table public.projects enable row level security;

create policy "Enable all access for development"
on public.projects for all 
using (true) 
with check (true);
```

## Console Commands

- `help` - Show available commands
- `time` - Display current time
- `gps` - Request GPS location
- `focus <minutes>` - Start focus timer (default: 25)
- `break <minutes>` - Start break timer (default: 5)
- `stop` - Stop Pomodoro timer
- `projects` - List all projects

## Customization

### Background Image
1. Go to `/settings`
2. Enter an image URL in "Console Background"
3. Save settings

The image will appear as a semi-transparent background in the console.

### Stripe Links
1. Go to `/settings`
2. Paste your Stripe checkout links (Starter, Pro, Enterprise)
3. These are display-only and won't trigger actual Stripe integration

## Build for Production

```bash
npm run build
```

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Supabase (optional)

## Project URL

**Lovable Project**: https://lovable.dev/projects/540e2af9-7504-42ff-bab7-5aef876ef397
