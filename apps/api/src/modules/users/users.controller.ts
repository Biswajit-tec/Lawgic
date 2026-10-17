import { Controller, Get, Patch, Delete, Body, UseGuards, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { UsersService } from "./users.service";
import type { AuthenticatedUser } from "@lawgic/types";

@ApiTags("users")
@ApiBearerAuth("supabase-jwt")
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @ApiOperation({ summary: "Get current user profile" })
  getMe(@CurrentUser() user: AuthenticatedUser): unknown {
    return this.usersService.findById(user.id);
  }

  @Patch("me")
  @ApiOperation({ summary: "Update current user profile" })
  updateMe(@CurrentUser() user: AuthenticatedUser, @Body() body: unknown): unknown {
    return this.usersService.update(user.id, body);
  }

  @Delete("me")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: "Delete account and schedule data cleanup" })
  deleteMe(@CurrentUser() user: AuthenticatedUser): Promise<{ message: string }> {
    return this.usersService.scheduleAccountDeletion(user.id);
  }
}
