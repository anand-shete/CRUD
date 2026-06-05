## Tech Stack

**Node.js**: Javascript runtime environment
**Nest.js**: Node.js framework
**Prisma**: Postgres ORM
**PostgreSQL**: SQL database

## API Endpoints

- `GET` `/api/v1/user`: Get all users
- `POST` `/api/v1/user`: Create a user
- `GET` `/api/v1/user/:id` : Get user by id
- `PATCH` `/api/v1/user/:id`: Reset name
- `DELETE` `/api/v1/user/:id` : Delete user by id

## Local Development

### Prerequisites

- Node.js
- Postgres downloaded locally
- psql CLI tool

### Setup

1. Install dependencies

```sh
pnpm install
```

2. Configure environment varibles

```sh
cp .env.example .env
```

Open `.env` and add your credentials

3. Generate Prisma Migrations

```sh
pnpm dlx prisma migrate dev
```

4. Generate typesafe client

```sh
pnpm dlx prisma generate
```

5. Start development server

```sh
pnpm start:dev
```
