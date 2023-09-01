interface IApiExceptionOptions extends ErrorOptions {
  status?: number;
  data?: Record<string, string>;
}

export class ApiException extends Error {
  status?: number;
  data?: Record<string, string>;

  constructor(message: string, options?: IApiExceptionOptions) {
    super(message, { cause: options?.cause });

    this.name = 'ApiException';
    this.status = options?.status;
    this.data = options?.data;
  }
}

export class NotFoundException extends ApiException {
  constructor(message: string, options?: IApiExceptionOptions) {
    super(message, { cause: options?.cause });

    this.name = 'NotFoundException';
    this.status = options?.status || 404;
  }
}

export class UnauthorizedException extends ApiException {
  constructor(message: string, options?: IApiExceptionOptions) {
    super(message, { cause: options?.cause });

    this.name = 'UnauthorizedException';
    this.status = options?.status || 401;
  }
}

export class ForbiddenException extends ApiException {
  constructor(message: string, options?: IApiExceptionOptions) {
    super(message, { cause: options?.cause });

    this.name = 'ForbiddenException';
    this.status = options?.status || 403;
  }
}

export class ServerException extends ApiException {
  constructor(message: string, options?: IApiExceptionOptions) {
    super(message, { cause: options?.cause });

    this.name = 'ServerException';
    this.status = options?.status || 500;
  }
}
