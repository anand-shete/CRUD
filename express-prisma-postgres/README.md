# Prisma

Prisma is an ORM (Object Relational Mapper) for SQL databases like PostgreSQL, MySQL, SQLite, SQL Server, and CockroachDB.

## Documentation

[Prisma Schema and Client setup](https://www.prisma.io/docs/orm)
[One to Many relation in Prisma](https://www.prisma.io/docs/orm/v6/prisma-schema/data-model/relations/one-to-many-relations)
[Error handling in Prisma](https://www.prisma.io/docs/orm/reference/error-reference)
[Prisma Better Errors](https://www.youssefhany.dev/better-prisma-errors)

## API Endpoints

- `GET` `/api/v1/user`: Get all users
- `GET` `/api/v1/user/:id` : Get user by id
- `POST` `/api/v1/user/create`: Create a user
- `POST` `/api/v1/user/login`: Login a user
- `POST` `/api/v1/user/update-username`: Reset username
- `DELETE` `/api/v1/user/:id` : Delete user by id

## Key findings

- Create custom Error classes to handle various Prisma errors

- In **one to many** relations, you can set different `onDelete` and `onUpdate` options:
  1. Cascade: If a relation deleted on `one` side, delete all records in `many` side
  2. SetNull: If a relation deleted on `one` side, set all records in `many` side to `NULL`
  3. Restrict: Prevent deletion on `one` side, if there is a record in `many` side
