import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

// =============================================================================
// JWT Auth Guard — Applied globally or per-route
// Routes marked with @Public() bypass this guard.
// All other routes REQUIRE a valid Supabase JWT.
// =============================================================================

@Injectable()
export class JwtAuthGuard extends AuthGuard("supabase-jwt") {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    return super.canActivate(context);
  }
}
