# Documentation

[Prisma CLI](https://www.prisma.io/docs/orm/reference/prisma-cli-reference)

## Notes

- Single updates and deletes can only be done on unique fields.
- Always prefer explicit fields by using `@db` instead of letting prisma infer it

## Prisma CLI

| Command                 | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `prisma init`           | Intialize prisma                                             |
| `prisma generate`       | Generate typesafe prisma client based on schema              |
| `prisma migrate status` | Check the state of migrations                                |
| `prisma migrate dev`    | Generate migration from changes and apply to database        |
| `prisma migrate deploy` | Apply pending migrations to database                         |
| `prisma migrate diff`   | Outputs SQL queries to change first scheam to second         |
| `prisma migrate reset`  | Reset database and apply all migrations                      |
| `prisma db push`        | Sync prisma schema to database without creating migrations   |
| `prisma db pull`        | Populates schema.prisma based on existing database           |
| `prisma db seed`        | Execute seed script defined in package.json under prisma key |
| `prisma studio`         | Launches a local GUI to view and edit your database records  |

### Examples

1. Prisma diff command

```sh
pnpm prisma migrate diff --from-config-datasource --to-schema ./prisma/schema.prisma
```

2. Create prisma migration without applying

```sh
pnpm prisma migrate dev -n "added Project and Task tables" --create-only
```
