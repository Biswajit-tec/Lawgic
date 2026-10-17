import { Module, Global } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import postgres from "postgres";

// =============================================================================
// Database Module — PostgreSQL via `postgres` (sql template literal driver)
// Uses postgres.js for type-safe, injection-safe queries
// Migrations are managed via custom migration runner (not an ORM)
// =============================================================================

export const DATABASE_CLIENT = Symbol("DATABASE_CLIENT");

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ReturnType<typeof postgres> => {
        const databaseUrl = configService.getOrThrow<string>("DATABASE_URL");
        return postgres(databaseUrl, {
          max: 20,
          idle_timeout: 30,
          connect_timeout: 10,
          ssl: configService.get<string>("NODE_ENV") === "production" ? { rejectUnauthorized: true } : false,
          // Transformations: snake_case DB columns → camelCase JS
          transform: postgres.camel,
          // IMPORTANT: Parameter injection prevents SQL injection
          // Never use string interpolation for user-provided values
        });
      },
    },
  ],
  exports: [DATABASE_CLIENT],
})
export class DatabaseModule {}
