import { GetUserAction } from "@/core/presentation/user/GetUser.action";
import { SidebarTrigger } from "@/features/dashboard/SidebarTrigger";
import { DashboardSidebar } from "@/features/dashboard/DashboardSidebar";
import { UserContextProvider } from "@/hooks/UserContext";
import { redirect } from "next/navigation";

export const instant = false;
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await GetUserAction();

  if (!user || user.role == "user") {
    redirect("/explorer");
  }

  return (
    <UserContextProvider user={user}>
      <DashboardSidebar>{children}</DashboardSidebar>
    </UserContextProvider>
  );
}
