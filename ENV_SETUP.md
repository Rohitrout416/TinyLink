# TinyLink Environment Configuration

This file documents the environment variables needed for TinyLink.

## Required Variables

### DATABASE_URL
The connection string for your database.
- **Local development**: `file:./dev.db` (SQLite)
- **Production**: Your PostgreSQL/Neon connection string

### NEXT_PUBLIC_BASE_URL
The base URL where your application is hosted. This is used to generate short URLs.
- **Local development**: `http://localhost:3000`
- **Production**: `https://yourdomain.com` (your actual domain)

## Setup Instructions

1. Copy this file to `.env` in the project root
2. Update `NEXT_PUBLIC_BASE_URL` to match your deployment URL
3. For production, update `DATABASE_URL` to your production database

## Example .env file:

```
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## Production Example:

```
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXT_PUBLIC_BASE_URL="https://tiny.yourdomain.com"
```
