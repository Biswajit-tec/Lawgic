import { Module } from "@nestjs/common";
import { DocumentsController } from "./documents.controller";
import { DocumentsService } from "./documents.service";
import { StorageModule } from "../../common/storage/storage.module";
import { QueueModule } from "../../common/queue/queue.module";

@Module({
  imports: [StorageModule, QueueModule],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
