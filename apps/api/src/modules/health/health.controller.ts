import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { Public } from "../auth/decorators/public.decorator";
import type { HealthCheckResponse } from "@lawgic/types";

// =============================================================================
// Health Controller — Publicly accessible health check endpoints
// Used by load balancers, monitoring systems, and Docker healthchecks
// =============================================================================

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: "Health check", description: "Returns service health status" })
  check(): HealthCheckResponse {
    return {
      status: "healthy",
      version: process.env["npm_package_version"] ?? "0.1.0",
      timestamp: new Date().toISOString(),
      services: {
        api: { status: "up" },
        // TODO: Add DB and Redis health checks
        // database: await this.databaseService.healthCheck(),
        // redis: await this.redisService.healthCheck(),
      },
    };
  }

  @Get("ready")
  @Public()
  @ApiOperation({ summary: "Readiness check" })
  ready(): { ready: boolean; timestamp: string } {
    return { ready: true, timestamp: new Date().toISOString() };
  }

  @Get("live")
  @Public()
  @ApiOperation({ summary: "Liveness check" })
  live(): { alive: boolean; timestamp: string } {
    return { alive: true, timestamp: new Date().toISOString() };
  }
}
