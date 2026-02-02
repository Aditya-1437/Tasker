# Tasker - Daily Task Manager

A high-fidelity "Daily Task Manager" built with Next.js 15, TypeScript, and Zustand.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Shadcn/ui (Radix Primitives)
- **State Management**: Zustand (Global Store) + Zustand Persist (LocalStorage)
- **Drag & Drop**: `@hello-pangea/dnd`
- **Animations**: Framer Motion

## Features
- **Kanban Board**: layout with "To-Do", "In Progress", and "Finished" columns.
- **Micro-interactions**: Smooth drag and drop animations and hover effects.
- **Search & Filter**: Real-time filtering of tasks by title.
- **Persistence**: Tasks are saved to LocalStorage and persist across reloads.
- **Clean UI**: "Calm Focus" color palette for a distraction-free experience.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure
- `app/page.tsx`: Main Dashboard and Layout.
- `store/useTaskStore.ts`: Zustand store with persistence logic.
- `components/board/`: Modular Kanban board components (`Board`, `Column`, `TaskCard`).
