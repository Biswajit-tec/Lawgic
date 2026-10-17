import { Module, Global } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

// =============================================================================
// Redis Module — Used for: caching, rate limiting, BullMQ queues, session state
// =============================================================================

export const REDIS_CLIENT = Symbol("REDIS_CLIENT");

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Redis => {
        const redisUrl = configService.getOrThrow<string>("REDIS_URL");
        const client = new Redis(redisUrl, {
          maxRetriesPerRequest: 3,
          lazyConnect: false,
          // Reconnect strategy
          retryStrategy: (times: number) => {
            if (times > 10) return null; // Stop retrying
            return Math.min(times * 1000, 5000);
          },
        });

        client.on("connect", () => console.log("[Redis] Connected"));
        client.on("error", (err: Error) => {
          // Log error ID only — never log Redis contents which may include cached PII
          console.error("[Redis] Connection error", { message: err.message });
        });

        return client;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
