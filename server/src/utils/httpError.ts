export class HttpError extends Error {
  public status!: number;
  public message!: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default function createHttpError(status: number, message: string): HttpError {
  return new HttpError(status, message);
}
