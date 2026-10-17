import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Queue } from "bullmq";
import Redis from "ioredis";
import { REDIS_CLIENT } from "../redis/redis.module";
import { QUEUE_NAMES } from "@lawgic/config";

// Token symbols for queue injection
export const DOCUMENT_PROCESSING_QUEUE = Symbol("DOCUMENT_PROCESSING_QUEUE");
export const DOCUMENT_DELETION_QUEUE = Symbol("DOCUMENT_DELETION_QUEUE");
export const NOTIFICATIONS_QUEUE = Symbol("NOTIFICATIONS_QUEUE");

// =============================================================================
// Queue Module — BullMQ queue registration
// Document processing MUST be asynchronous — never block HTTP requests.
// =============================================================================

function createQueue(name: string, connection: Redis): Queue {
  return new Queue(name, {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: "exponential", delay: 5000 },
      removeOnComplete: { count: 100 },
      removeOnFail: { count: 500 },
    },
  });
}

@Module({
  providers: [
    {
      provide: DOCUMENT_PROCESSING_QUEUE,
      inject: [REDIS_CLIENT],
      useFactory: (redis: Redis): Queue => createQueue(QUEUE_NAMES.DOCUMENT_PROCESSING, redis),
    },
    {
      provide: DOCUMENT_DELETION_QUEUE,
      inject: [REDIS_CLIENT],
      useFactory: (redis: Redis): Queue => createQueue(QUEUE_NAMES.DOCUMENT_DELETION, redis),
    },
    {
      provide: NOTIFICATIONS_QUEUE,
      inject: [REDIS_CLIENT],
      useFactory: (redis: Redis): Queue => createQueue(QUEUE_NAMES.NOTIFICATIONS, redis),
    },
  ],
  exports: [DOCUMENT_PROCESSING_QUEUE, DOCUMENT_DELETION_QUEUE, NOTIFICATIONS_QUEUE],
})
export class QueueModule {}
