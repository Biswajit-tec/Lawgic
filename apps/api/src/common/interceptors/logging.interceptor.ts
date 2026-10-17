import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import type { Request } from "express";

// =============================================================================
// Logging Interceptor — Structured Request/Response Logging
// NEVER log: request bodies (may contain PII/document content), auth tokens
// ALWAYS log: method, path, status, duration, requestId, userId
// =============================================================================

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger("HTTP");

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const start = Date.now();
    const requestId = request.headers["x-request-id"] as string | undefined;
    const method = request.method;
    const path = request.path;

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse<{ statusCode: number }>();
          const duration = Date.now() - start;
          this.logger.log({
            type: "request",
            method,
            path,
            statusCode: response.statusCode,
            durationMs: duration,
            requestId,
            // userId available if request is authenticated (added by auth guard)
            // NEVER log: request.body, request.query parameters that may contain PII
          });
        },
        error: () => {
          const duration = Date.now() - start;
          this.logger.warn({
            type: "request_error",
            method,
            path,
            durationMs: duration,
            requestId,
          });
        },
      }),
    );
  }
}
