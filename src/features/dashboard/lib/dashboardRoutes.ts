import { UserRole } from "@/core/domain/model";
import { Users, type LucideIcon } from "lucide-react";

export type DashboardRoute = {
  path: string;
  roles: UserRole[];
  name: string;
  Icon: LucideIcon;
};
export const DASHBOARD_ROUTES: Record<string, DashboardRoute> = {
  USERS: { path: "users", roles: ["superuser"], name: "Users", Icon: Users },
};
