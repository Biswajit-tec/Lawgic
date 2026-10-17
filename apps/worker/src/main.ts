// =============================================================================
// Worker Main — BullMQ Job Processor Entry Point
// Document processing MUST be asynchronous — never block HTTP requests.
//
// Processing pipeline:
// 1. Receive job from queue (enqueued by API)
// 2. Fetch document from storage
// 3. Run OCR (via AI service)
// 4. Classify document (via AI service)
// 5. Extract information (via AI service)
// 6. Run RAG analysis (via AI service)
// 7. Store results in database
// 8. Notify user (via notification queue)
// =============================================================================

import { Worker, type Job } from "bullmq";
import Redis from "ioredis";
import { QUEUE_NAMES } from "@lawgic/config";
import { processDocumentJob } from "./processors/document.processor";
import { deleteDocumentJob } from "./processors/delete.processor";

const REDIS_URL = process.env["REDIS_URL"];
if (!REDIS_URL) {
  console.error("[Worker] REDIS_URL is required. Exiting.");
  process.exit(1);
}

const connection = new Redis(REDIS_URL, { maxRetriesPerRequest: null });

// ─── Document Processing Worker ───────────────────────────────────────────────
const documentWorker = new Worker(
  QUEUE_NAMES.DOCUMENT_PROCESSING,
  async (job: Job) => {
    console.log(`[Worker] Processing job ${job.id} of type ${job.name}`);
    return processDocumentJob(job);
  },
  {
    connection,
    concurrency: 2, // Process 2 documents in parallel — adjust based on AI service capacity
    limiter: { max: 5, duration: 60_000 }, // Max 5 jobs per minute
  },
);

// ─── Document Deletion Worker ──────────────────────────────────────────────────
const deletionWorker = new Worker(
  QUEUE_NAMES.DOCUMENT_DELETION,
  async (job: Job) => {
    console.log(`[Worker] Processing deletion job ${job.id}`);
    return deleteDocumentJob(job);
  },
  { connection, concurrency: 5 },
);

// ─── Graceful Shutdown ─────────────────────────────────────────────────────────
async function shutdown(): Promise<void> {
  console.log("[Worker] Shutting down gracefully...");
  await documentWorker.close();
  await deletionWorker.close();
  await connection.quit();
  console.log("[Worker] Shutdown complete");
  process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

documentWorker.on("completed", (job) => {
  console.log({ event: "job_completed", jobId: job.id, type: job.name });
});

documentWorker.on("failed", (job, err) => {
  console.error({ event: "job_failed", jobId: job?.id, type: job?.name, error: err.message });
});

console.log("[Worker] LAWgic Worker started");
console.log(`[Worker] Listening on queues: ${QUEUE_NAMES.DOCUMENT_PROCESSING}, ${QUEUE_NAMES.DOCUMENT_DELETION}`);
