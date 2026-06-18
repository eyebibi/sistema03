type BaseErrorProps = {
  name?: string;
  message?: string;
  action?: string;
  stack: string;
  statusCode?: number;
};

class BaseError extends Error {
  readonly action?: string;
  readonly statusCode?: number;

  constructor({ name, message, action, stack, statusCode }: BaseErrorProps) {
    super();

    this.name = name;
    this.message = message;
    this.stack = stack;
    this.action = action;
    this.statusCode = statusCode;
  }

  toJSON() {
    return {
      name: this.name,
      action: this.action,
      message: this.message,
      stack: this.stack,
      statusCode: this.statusCode,
    };
  }
}

class ServiceError extends BaseError {
  constructor({ message, stack, action, statusCode }: BaseErrorProps) {
    super({
      name: "ServiceError",
      message: message || "Service temporarily unavailable.",
      action:
        action ||
        "Please try again. If the error persists, contact the administrator.",
      statusCode: statusCode || 503,
      stack: stack,
    });
  }
}

class ValidationError extends BaseError {
  constructor({ message, stack, action, statusCode }: BaseErrorProps) {
    super({
      name: "ValidationError",
      message: message || "A validation error happened.",
      action: action || "Please, verify your data.",
      statusCode: statusCode || 400,
      stack: stack,
    });
  }
}

class NotFoundError extends BaseError {
  constructor({ message, stack, action, statusCode }: BaseErrorProps) {
    super({
      name: "NotFoundErrror",
      message: message || "The requested resource could not be found.",
      action: action || "Please, verify your data.",
      statusCode: statusCode || 404,
      stack: stack,
    });
  }
}

class AuthorizationError extends BaseError {
  constructor({ message, stack, action, statusCode }: BaseErrorProps) {
    super({
      name: "AuthorizationError",
      message: message || "Unauthorized",
      action: action || "Please, verify your data.",
      statusCode: statusCode || 401,
      stack: stack,
    });
  }
}

class UnknownErrror extends BaseError {
  constructor({ message, stack, action, statusCode }: BaseErrorProps) {
    super({
      name: "UnknownErrror",
      message: message || "Unknown error",
      action: action || "Please, try again.",
      statusCode: statusCode || 520,
      stack: stack,
    });
  }
}

export {
  ServiceError,
  ValidationError,
  NotFoundError,
  AuthorizationError,
  UnknownErrror,
};
