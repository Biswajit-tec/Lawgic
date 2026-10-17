import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  async findById(userId: string): Promise<unknown> {
    // TODO: Query users table by ID
    return { id: userId };
  }

  async update(userId: string, _data: unknown): Promise<unknown> {
    // TODO: Validate input, update user record
    return { id: userId };
  }

  async scheduleAccountDeletion(userId: string): Promise<{ message: string }> {
    // TODO: Mark account for deletion, enqueue cleanup job
    // Cleanup must remove: documents, analyses, embeddings, conversations
    return { message: "Account deletion scheduled. Your data will be removed within 30 days." };
  }
}
