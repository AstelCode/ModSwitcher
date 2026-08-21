"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { UserMenu } from "../userMenu/UserMenu";

export function ExplorerNav() {
  return (
    <>
      <div className="w-full bg-card h-14 items-center grid grid-cols-[1fr_2fr_1fr] gap-2 p-2">
        <div />
        <div className="flex justify-center items-center">
          <InputGroup className="max-w-xl">
            <InputGroupInput placeholder="Search" />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="flex items-center justify-end">
          <UserMenu />
        </div>
      </div>
    </>
  );
}
