import { GetUserAction } from "@/core/presentation/user";
import { ExplorerNav } from "@/features/Explorer/ExplorerNav";
export const instant = false;
export default async function DashboradLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await GetUserAction();
  return (
    <div className="w-screen h-screen ">
      <ExplorerNav user={user} />
      {children}
    </div>
  );
}
