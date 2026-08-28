## Tech Stack

**Python**: Programming Language
**FastAPI**: Python framework
**SQLModel**: Postgres ORM for FastAPI
**AsyncPG**: Database driver for Postgres ORM
**PostgreSQL**: SQL database

## API Endpoints

- `GET` `/api/v1/user`: Get all users
- `GET` `/api/v1/user/:id` : Get user by id
- `POST` `/api/v1/user/create`: Create a user
- `POST` `/api/v1/user/update-username`: Reset username
- `DELETE` `/api/v1/user/:id` : Delete user by id

## Local Development

### Prerequisites

- Python 3.10+
- Postgres installed
- [uv](https://docs.astral.sh/uv/getting-started/installation/) installed

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
pnpm dev
```
