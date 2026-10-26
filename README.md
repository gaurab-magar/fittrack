# FitTrack

FitTrack is a workout tracking application built with Next.js, React, TypeScript, Express, Prisma, and PostgreSQL.

Users can add, edit, and delete workouts and view workout summaries. The application uses a separate frontend, backend API, and PostgreSQL database.

## Features

- Create, edit, and delete workouts
- Track workout type, duration, and date
- View workout summaries
- Store workout data in PostgreSQL
- Run the application using Docker Compose

## Prerequisites

Install the following before starting:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Git

You do not need to install Node.js or PostgreSQL separately to run the Dockerized application.

## Getting Started with Docker

### 1. Clone the repository

```bash
git clone https://github.com/gaurab-magar/fittrack.git
cd fittrack
```

### 2. Start the application

Run this command from the project root:

```bash
docker compose up --build -d
```

Docker Compose builds the application images and starts the frontend, backend, and database containers.

### 3. Open FitTrack

- Frontend: http://localhost:3000
- Backend health check: http://localhost:3001/api/health
- Workouts API: http://localhost:3001/api/workouts

### 4. Check the containers

```bash
docker compose ps
```

To view backend logs:

```bash
docker compose logs --tail=50 backend
```

### 5. Stop the application

```bash
docker compose stop
```

To start the stopped containers again:

```bash
docker compose up -d
```

Your PostgreSQL data is stored in a Docker volume and is designed to persist when containers are stopped and restarted.

**Important:** Avoid `docker compose down -v` unless you intentionally want to remove the Compose-managed volumes and their stored database data.

## Running Locally for Development

### Frontend

Install dependencies:

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

Open http://localhost:3000.

The backend and PostgreSQL database must also be running for workout operations to work. Follow the backend setup instructions in the `backend/` directory and configure the required database connection.

## Useful Commands

Frontend:

```bash
npm run lint
npm run build
```

Backend, run from the `backend/` directory:

```bash
npm run typecheck
npm run build
```

## Project Structure

```text
fittrack/
├── app/                 # Next.js pages and global styles
├── components/          # Reusable UI components
├── hooks/               # Frontend hooks
├── lib/                 # Frontend utilities and API integration
├── types/               # Shared TypeScript types
├── backend/
│   ├── src/             # Express API and Prisma integration
│   ├── prisma/          # Database schema and migrations
│   └── Dockerfile       # Backend container configuration
├── Dockerfile           # Frontend container configuration
├── compose.yaml         # Frontend, backend, and database services
└── README.md
```

## Contributing

1. Clone the repository.
2. Create a feature branch.
3. Make your changes and test them locally.
4. Commit your changes.
5. Push your branch and open a pull request for review.

Please do not commit `.env` files, passwords, database credentials, or other secrets.