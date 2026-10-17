import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { randomUUID } from "crypto";
import type { Request, Response } from "express";

// =============================================================================
// Request ID Interceptor — Correlation ID for distributed tracing
// =============================================================================

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    // Use client-provided ID if valid, otherwise generate
    const requestId =
      typeof request.headers["x-request-id"] === "string" && /^[\w\-]{8,64}$/.test(request.headers["x-request-id"])
        ? request.headers["x-request-id"]
        : randomUUID();

    request.headers["x-request-id"] = requestId;
    response.setHeader("X-Request-ID", requestId);

    return next.handle();
  }
}
