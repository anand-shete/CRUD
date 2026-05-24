## Tech Stack

**Node.js**: Javascript runtime environment
**Express**: Node.js framework
**Prisma**: An Object Relational Mapper for databases.  
**PostgreSQL**: Most popular and feature-rich SQL database.

## Key findings

- You may need to create custom Error class to handle various Prisma errors
- When you delete a row from Many _Post_ to Many _Comment_ relation table, Prisma will:
  - Delete entry from the first table _Post_
  - Delete entry from the join table _\_PostToComments_
  - But won't delete entries from the second table _Comment_.

  This happens because other _Post_ can also refer to same _Comment_, so deleting those will cause integrity issues.

- You cannot set `onDelete` or `onUpdate` options for **many to many relations**

- In **one to many** relations, you can set different `onDelete` and `onUpdate` options that matter mainly:
  - **Cascade**: When parent is deleted, delete all dependent (foreign key) records.
  - **SetNull**: When parent is deleted, set foreign key in child to `NULL`.
  - **Restrict**: Prevent deletion completely if there is a related row in other table.
