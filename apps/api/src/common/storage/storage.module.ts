import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StorageService } from "./storage.service";
import { LocalStorageAdapter } from "./local-storage.adapter";
// Future: import { S3StorageAdapter } from "./s3-storage.adapter";

// =============================================================================
// Storage Module — Provider selected by STORAGE_PROVIDER env var
// This is the key to provider-agnostic storage architecture.
// To switch to S3: set STORAGE_PROVIDER=s3 and add S3StorageAdapter.
// =============================================================================

@Module({
  providers: [
    {
      provide: StorageService,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): StorageService => {
        const provider = configService.get<string>("STORAGE_PROVIDER") ?? "local";
        switch (provider) {
          case "s3":
            // TODO: return new S3StorageAdapter(configService);
            throw new Error("S3 storage adapter not yet implemented. Set STORAGE_PROVIDER=local for development.");
          case "local":
          default:
            return new LocalStorageAdapter(configService);
        }
      },
    },
  ],
  exports: [StorageService],
})
export class StorageModule {}
