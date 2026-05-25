## Components

**Prisma Client**: Auto-generated and type-safe query builder for Node.js & TypeScript
**Prisma Migrate**: Migration system
**Prisma Studio**: GUI to view and edit data in your database

## Singleton Pattern

You do not need a Singleton with an Express.js app because `nodemon` and `tsx` use Process-Level Reloading (destroying and recreating the sandbox), whereas Next.js uses Module-Level Reloading (keeping the sandbox alive but replacing the files inside it), so you will have to use singleton pattern there.

## Shadow Database

Apart from saving state to `_prisma_migrations` table and local `prisma/migrations`, Prisma maintains a Shadow Database behind the scenes which safely generates and validate new database migrations, detect schema drift, and verify that changes won't cause data loss. Hence, prisma maintains `3` different sources of truth in development.
