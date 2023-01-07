export class ServiceError extends Error {
  constructor(message: string, code: number, innerError?: Error) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.innerError = innerError;
  }

  readonly code: number;
  readonly innerError? :Error;

  toString(): string {
    return JSON.stringify({
      code: this.code,
      message: this.message,
      innerError: this.innerError ?? undefined
    }, undefined, 2);
  }
}
