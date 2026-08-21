import { GetUserAction } from "@/core/presentation/user";
import { ExplorerNav } from "@/features/Explorer/ExplorerNav";
import { UserContextProvider } from "@/hooks/UserContext";
export const instant = false;
export default async function DashboradLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await GetUserAction();
  return (
    <UserContextProvider user={user}>
      <div className="w-screen h-screen ">
        <ExplorerNav />
        {children}
      </div>
    </UserContextProvider>
  );
}
