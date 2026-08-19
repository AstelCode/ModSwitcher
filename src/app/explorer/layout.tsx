import { ExplorerNav } from "@/features/Explorer/ExplorerNav";

export default async function DashboradLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen ">
      <ExplorerNav />
      {children}
    </div>
  );
}
