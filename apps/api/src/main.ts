// =============================================================================
// NestJS API — Application Entry Point
// Security middleware is bootstrapped here, not in individual modules.
// =============================================================================

import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import compression = require("compression");
import cookieParser = require("cookie-parser");
import helmet from "helmet";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { RequestIdInterceptor } from "./common/interceptors/request-id.interceptor";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";

async function bootstrap(): Promise<void> {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule, {
    // Disable default logger — replaced with structured logger
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>("PORT");
  const nodeEnv = configService.getOrThrow<string>("NODE_ENV");
  const apiPrefix = configService.getOrThrow<string>("API_PREFIX");
  const corsOrigins = configService.getOrThrow<string>("CORS_ORIGINS").split(",");

  // ─── Security Headers (Helmet) ────────────────────────────────────────────
  app.use(
    helmet({
      contentSecurityPolicy: nodeEnv === "production",
      crossOriginEmbedderPolicy: nodeEnv === "production",
    }),
  );

  // ─── CORS ─────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
    exposedHeaders: ["X-Request-ID"],
  });

  // ─── Compression ──────────────────────────────────────────────────────────
  app.use(compression());

  // ─── Cookie Parser ────────────────────────────────────────────────────────
  app.use(cookieParser());

  // ─── Global API Prefix ────────────────────────────────────────────────────
  app.setGlobalPrefix(apiPrefix);

  // ─── Global Validation Pipe ───────────────────────────────────────────────
  // Whitelist strips unknown properties — prevents mass assignment vulnerabilities
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  // ─── Global Exception Filter ──────────────────────────────────────────────
  // Ensures internal errors are never exposed to clients
  app.useGlobalFilters(new HttpExceptionFilter());

  // ─── Global Interceptors ──────────────────────────────────────────────────
  app.useGlobalInterceptors(new RequestIdInterceptor(), new LoggingInterceptor());

  // ─── Swagger / OpenAPI ────────────────────────────────────────────────────
  if (nodeEnv !== "production") {
    const swaggerConfig = new DocumentBuilder()
      .setTitle("LAWgic API")
      .setDescription("LAWgic — Making India's legal system understandable. REST API documentation.")
      .setVersion("0.1.0")
      .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" }, "supabase-jwt")
      .addTag("health", "Health check endpoints")
      .addTag("auth", "Authentication")
      .addTag("users", "User management")
      .addTag("documents", "Document upload and management")
      .addTag("analyses", "Document analysis")
      .addTag("conversations", "Legal Q&A conversations")
      .addTag("cases", "Legal case tracking")
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
    logger.log(`Swagger UI: http://localhost:${port}${apiPrefix}/docs`);
  }

  await app.listen(port);
  logger.log(`LAWgic API running on port ${port} [${nodeEnv}]`);
}

bootstrap().catch((error: unknown) => {
  const logger = new Logger("Bootstrap");
  logger.error("Fatal error during bootstrap", error instanceof Error ? error.stack : String(error));
  process.exit(1);
});
