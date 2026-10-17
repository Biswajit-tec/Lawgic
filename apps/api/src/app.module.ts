import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { appConfig } from "./config/app.config";
import { validateEnv } from "./config/env.validation";
import { DatabaseModule } from "./database/database.module";
import { RedisModule } from "./common/redis/redis.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { DocumentsModule } from "./modules/documents/documents.module";
import { AnalysesModule } from "./modules/analyses/analyses.module";
import { ConversationsModule } from "./modules/conversations/conversations.module";
import { CasesModule } from "./modules/cases/cases.module";
import { LegalModule } from "./modules/legal/legal.module";
import { AuditModule } from "./modules/audit/audit.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { HealthModule } from "./modules/health/health.module";
import { RATE_LIMITS } from "@lawgic/config";

@Module({
  imports: [
    // ─── Configuration (fail-fast env validation) ──────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validate: validateEnv,
      cache: true,
    }),

    // ─── Rate Limiting ─────────────────────────────────────────────────────
    ThrottlerModule.forRoot([
      {
        name: "default",
        ttl: RATE_LIMITS.GENERAL.windowMs,
        limit: RATE_LIMITS.GENERAL.max,
      },
    ]),

    // ─── Infrastructure ────────────────────────────────────────────────────
    DatabaseModule,
    RedisModule,

    // ─── Feature Modules ───────────────────────────────────────────────────
    HealthModule,
    AuthModule,
    UsersModule,
    DocumentsModule,
    AnalysesModule,
    ConversationsModule,
    CasesModule,
    LegalModule,
    AuditModule,
    NotificationsModule,
  ],
})
export class AppModule {}
