import { listUsersAction } from "@/core/presentation/admin/ListUsers.action";
import { DataTable } from "@/features/dashboard-user/table/UserTable";

export const instant = false;
export default async function UserPage() {
  const users = await listUsersAction();
  return (
    <div className="p-4">
      <DataTable data={users} />
    </div>
  );
}
