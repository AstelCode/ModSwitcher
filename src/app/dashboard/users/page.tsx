import { listUsersAction } from "@/core/presentation/admin/ListUsers.action";
import { DashboardUsersClient } from "@/features/dashboard-user/DashboardUsersClient";

export const instant = false;
export default async function UserPage() {
  const users = await listUsersAction();

  return (
    <div className="p-4">
      <DashboardUsersClient users={users} />
    </div>
  );
}
