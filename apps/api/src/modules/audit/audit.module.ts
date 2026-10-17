import { Module } from "@nestjs/common";

/**
 * Audit Module — Audit log recording and querying
 * TODO: Implement AuditService used by other modules
 * AuditService.log() must: never store sensitive content, always store identifiers
 */
@Module({})
export class AuditModule {}
