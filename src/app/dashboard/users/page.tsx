import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTable } from "@/features/dashboard-user/user-table";
import { PanelLeftOpen } from "lucide-react";

export default function UserPage() {
  return (
    <div className="p-4">
      <DataTable />
    </div>
  );
}
