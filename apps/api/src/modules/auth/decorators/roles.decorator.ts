import { SetMetadata } from "@nestjs/common";
import { UserRole } from "@lawgic/types";

export const ROLES_KEY = "roles";

/** Restricts route access to specified roles */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
