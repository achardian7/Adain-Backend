export class ApiError extends Error {
  constructor(
    public message: string,
    public readonly statusCode: number,
    public readonly error?: string,
    public readonly errors?: any[],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    Error.captureStackTrace(this, this.constructor);
  }

  public serializeErrors() {
    return {
      messaage: this.message,
      statusCode: this.statusCode,
      error: this.error ?? null,
      errors: this.errors ?? [],
    };
  }
}
