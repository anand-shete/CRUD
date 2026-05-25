If you prefer an object-oriented approach (common in NestJS frameworks), you can wrap your Prisma calls in a custom class or service layer that intercept errors before they hit the controller.

```ts
export class BaseRepository {
  protected async run<T>(prismaQuery: () => Promise<T>): Promise<T> {
    try {
      return await prismaQuery();
    } catch (error) {
      // Translate Prisma errors into custom application errors here
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // map code to custom error types...
      }
      throw error;
    }
  }
}

// Usage in a user service:
export class UserRepository extends BaseRepository {
  async getAllUsers() {
    return this.run(() => prisma.user.findMany());
  }
}
```
