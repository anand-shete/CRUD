export class CustomException extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
