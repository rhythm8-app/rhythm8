# Development Environment

This directory contains Docker configurations for local development of rhythm∞.

## Setup

1. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

2. Start the development environment:
   ```bash
   npm run dev
   # or
   docker-compose up -d
   ```

3. Access the services:
   - **Pocketbase Admin**: http://localhost:8090/_/ (admin@rhythm8.local / adminpassword123)
   - **Mailpit**: http://localhost:8025
   - **Traefik Dashboard**: http://localhost:8080

## Services

### Pocketbase
- **Port**: 8090
- **Data**: Stored in Docker volume `pocketbase_data`
- **Admin UI**: http://localhost:8090/_/

### Mailpit
- **SMTP Port**: 1025
- **Web UI Port**: 8025
- **Purpose**: Email testing and debugging

### Seeder
- **Purpose**: Initializes database schema and sample data
- **Runs once**: Sets up collections and seeds initial data

### Traefik
- **Purpose**: Reverse proxy for local development
- **Dashboard**: http://localhost:8080

## Development Workflow

1. Start services: `npm run dev`
2. The seeder will automatically set up the database
3. Develop your backend and frontend locally
4. Use VS Code to develop and debug
5. Stop services: `npm run dev:down`

## Local Domains

Add these entries to your `/etc/hosts` file for local development:

```
127.0.0.1 api.rhythm8.local
127.0.0.1 frontend.rhythm8.local
127.0.0.1 backend.rhythm8.local
127.0.0.1 mail.rhythm8.local
```