import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";
import { randomUUID } from "crypto";
import type { ErrorResponse } from "@lawgic/types";

// =============================================================================
// HTTP Exception Filter — Safe Error Responses
// NEVER expose: stack traces, internal DB errors, infrastructure details, PII
// ALWAYS return: safe error codes, user-friendly messages, request IDs
// =============================================================================

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const requestId = (request.headers["x-request-id"] as string | undefined) ?? randomUUID();
    const timestamp = new Date().toISOString();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = "INTERNAL_SERVER_ERROR";
    let message = "An unexpected error occurred. Please try again later.";
    let details: Record<string, unknown> | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === "object" && exceptionResponse !== null) {
        const res = exceptionResponse as Record<string, unknown>;
        code = typeof res["error"] === "string" ? res["error"] : this.statusToCode(status);
        message = typeof res["message"] === "string" ? res["message"] : message;
        // Include validation details only for 400 errors
        if (status === HttpStatus.BAD_REQUEST && Array.isArray(res["message"])) {
          code = "VALIDATION_ERROR";
          message = "Validation failed";
          details = { errors: res["message"] };
        }
      }
    } else {
      // Unexpected error — log with internal details, never expose them
      this.logger.error("Unhandled exception", {
        requestId,
        // Deliberately NOT logging: request body, headers with auth tokens, etc.
        path: request.url,
        method: request.method,
        error: exception instanceof Error ? exception.message : "Unknown error",
        // Stack trace only in development
        ...(process.env["NODE_ENV"] !== "production" && {
          stack: exception instanceof Error ? exception.stack : undefined,
        }),
      });
    }

    const errorResponse: ErrorResponse = {
      success: false,
      error: { code, message, ...(details && { details }) },
      requestId,
      timestamp,
    };

    response.status(status).json(errorResponse);
  }

  private statusToCode(status: number): string {
    const map: Record<number, string> = {
      400: "INVALID_REQUEST",
      401: "UNAUTHORIZED",
      403: "FORBIDDEN",
      404: "NOT_FOUND",
      409: "ALREADY_EXISTS",
      429: "RATE_LIMIT_EXCEEDED",
      503: "SERVICE_UNAVAILABLE",
    };
    return map[status] ?? "INTERNAL_SERVER_ERROR";
  }
}
