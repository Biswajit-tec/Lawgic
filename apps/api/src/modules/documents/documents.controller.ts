import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { DocumentsService } from "./documents.service";
import type { AuthenticatedUser, InitiateUploadResponse } from "@lawgic/types";
import { InitiateUploadSchema } from "@lawgic/validation";
import { RATE_LIMITS } from "@lawgic/config";

// =============================================================================
// Documents Controller
// Authorization: every document endpoint verifies user ownership server-side.
// NEVER expose document content or file paths in responses.
// =============================================================================

@ApiTags("documents")
@ApiBearerAuth("supabase-jwt")
@UseGuards(JwtAuthGuard)
@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  /**
   * Initiates a document upload.
   * Returns a presigned upload URL — the client uploads directly to storage.
   * The document record is created in DB with PENDING_UPLOAD status.
   */
  @Post("upload")
  @Throttle({ default: { ttl: RATE_LIMITS.DOCUMENT_UPLOAD.windowMs, limit: RATE_LIMITS.DOCUMENT_UPLOAD.max } })
  @ApiOperation({ summary: "Initiate document upload", description: "Returns a presigned upload URL" })
  async initiateUpload(
    @Body() body: unknown,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<InitiateUploadResponse> {
    const validated = InitiateUploadSchema.parse(body);
    return this.documentsService.initiateUpload(user.id, validated);
  }

  /**
   * Confirms that upload to storage is complete and triggers processing pipeline.
   * The client calls this after successfully uploading to the presigned URL.
   */
  @Post(":documentId/confirm-upload")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: "Confirm upload complete and start processing" })
  @ApiParam({ name: "documentId", type: String, format: "uuid" })
  async confirmUpload(
    @Param("documentId", ParseUUIDPipe) documentId: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<{ jobId: string; documentId: string }> {
    return this.documentsService.confirmUploadAndEnqueue(user.id, documentId);
  }

  @Get()
  @ApiOperation({ summary: "List user documents" })
  async listDocuments(@CurrentUser() user: AuthenticatedUser): Promise<unknown> {
    return this.documentsService.listByUser(user.id);
  }

  /**
   * Authorization: verifies document belongs to the requesting user.
   * Returns 403 if user does not own the document — never 404 which would
   * reveal document existence to unauthorized users.
   */
  @Get(":documentId")
  @ApiOperation({ summary: "Get document by ID" })
  @ApiParam({ name: "documentId", type: String, format: "uuid" })
  async getDocument(
    @Param("documentId", ParseUUIDPipe) documentId: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<unknown> {
    return this.documentsService.findByIdForUser(user.id, documentId);
  }

  @Get(":documentId/status")
  @ApiOperation({ summary: "Get document processing status" })
  @ApiParam({ name: "documentId", type: String, format: "uuid" })
  async getStatus(
    @Param("documentId", ParseUUIDPipe) documentId: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<unknown> {
    return this.documentsService.getProcessingStatus(user.id, documentId);
  }

  @Delete(":documentId")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: "Delete a document and all derived data" })
  @ApiParam({ name: "documentId", type: String, format: "uuid" })
  async deleteDocument(
    @Param("documentId", ParseUUIDPipe) documentId: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<{ message: string }> {
    await this.documentsService.deleteDocument(user.id, documentId);
    return { message: "Document deletion scheduled" };
  }
}
