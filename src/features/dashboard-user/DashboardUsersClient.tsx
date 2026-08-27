"use client";

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { DialogProvider } from "@/hooks/DialogContext";
import { DataTable } from "./table/UserTable";
import { UserJson } from "@/core/domain/model";
import { convertToAdminAction } from "@/core/presentation/admin/ConvertToAdmin.action";
import { convertToUserAction } from "@/core/presentation/admin/ConvertToUser.action";
import { deleteUserAction } from "@/core/presentation/admin/DeleteUser.action";

export const DashboardUsersClient = ({ users }: { users: UserJson[] }) => {
  const convertToAdmin = async (args?: Record<string, string>) => {
    const id = args?.id as string;
    if (!id) return;
    await convertToAdminAction(id);
  };

  const convertToUser = async (args?: Record<string, string>) => {
    const id = args?.id as string;
    if (!id) return;
    await convertToUserAction(id);
  };

  const deleteUser = async (args?: Record<string, string>) => {
    const id = args?.id as string;
    if (!id) return;
    await deleteUserAction(id);
  };

  return (
    <DialogProvider>
      <ConfirmDialog
        title="Confirm Conversion to Admin"
        name="convertToAdmin"
        message="Are you sure you want to convert this user to an admin?"
        onConfirm={convertToAdmin}
      />
      <ConfirmDialog
        title="Confirm Conversion to User"
        name="convertToUser"
        message="Are you sure you want to convert this user to a user?"
        onConfirm={convertToUser}
      />
      <ConfirmDialog
        title="Confirm Deletion"
        name="deleteUser"
        message="Are you sure you want to delete this user?"
        onConfirm={deleteUser}
      />
      <DataTable data={users} />
    </DialogProvider>
  );
};
