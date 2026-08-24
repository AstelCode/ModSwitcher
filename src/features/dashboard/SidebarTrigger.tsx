"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export function SidebarTrigger() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button variant="ghost" onClick={toggleSidebar}>
      {open ? (
        <PanelLeftOpen className="size-5" />
      ) : (
        <PanelLeftClose className="size-5" />
      )}
    </Button>
  );
}
