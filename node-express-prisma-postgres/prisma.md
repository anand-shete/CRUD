# Documentation

[Prisma CLI](https://www.prisma.io/docs/orm/reference/prisma-cli-reference)

## Note

- Single updates and deletes can only be done on unique fields.
- Always prefer explicit fields by using `@db` instead of letting prisma infer it

## Prisma CLI

| Command               | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| prisma init           | Used to setup prisma                                         |
| prisma generate       | Generate typesafe prisma client based on schema              |
| prisma migrate status | Check the state of migrations                                |
| prisma migrate dev    | Generate and execute migration file if schema changed        |
| prisma migrate deploy | Apply pending migrations to database                         |
| prisma migrate diff   | Outputs SQL queries to change first scheam to second         |
| prisma migrate reset  | Completely reset a database                                  |
| prisma db push        | Sync prisma schema to database without creating migrations   |
| prisma db pull        | Populates schema.prisma based on existing database           |
| prisma db seed        | Execute seed script defined in package.json under prisma key |
| prisma studio         | Launches a local GUI to view and edit your database records  |
