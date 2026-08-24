"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { type DataTableFeatures } from "./user-table-features";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Info, MoreHorizontal, Trash, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { DropdownMenuTrigger } from "radix-ui/dropdown-menu";
import { UserStatus } from "@/core/domain/model";
import { UserRole } from "@/core/infrastructure/repositories/prisma/connection/enums";
import { Badge } from "@/components/ui/badge";

export type UserItem = {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
};

const columnHelper = createColumnHelper<DataTableFeatures, UserItem>();

interface GetColumnsProps {
  onDelete?: (id: string) => Promise<void>;
  convertToAdmin?: (id: string) => Promise<void>;
  convertToUser?: (id: string) => Promise<void>;
  convertToSuperUser?: (id: string) => Promise<void>;
}

export function getColumns(props?: GetColumnsProps) {
  return columnHelper.columns([
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("avatarUrl", {
      header: "Avatar",
      cell: ({ row }) => {
        const avatarUrl = row.getValue("avatarUrl") as string;
        // eslint-disable-next-line @next/next/no-img-element
        return avatarUrl ? <img src={avatarUrl} alt="avatar" /> : <User />;
      },
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    }),
    columnHelper.accessor("email", {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as UserStatus;
        if (status == "inactive") {
          return <Badge variant="outline">{status}</Badge>;
        }
        if (status == "active") {
          return <Badge variant="default">{status}</Badge>;
        }
        if (status == "banned") {
          return <Badge variant="destructive">{status}</Badge>;
        }
      },
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as UserRole;
        if (role == "admin") {
          return (
            <Badge variant="default" className="bg-amber-700">
              {role}
            </Badge>
          );
        }
        if (role == "user") {
          return <Badge variant="outline">{role}</Badge>;
        }
        if (role == "superuser") {
          return (
            <Badge variant="destructive" className="bg-green-700">
              {role}
            </Badge>
          );
        }
      },
    }),
    columnHelper.accessor("createdAt", {
      header: "Created At",
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as string;
        const formattedDate = new Date(createdAt).toLocaleDateString();
        return <div className="capitalize">{formattedDate}</div>;
      },
    }),
    columnHelper.accessor("updatedAt", {
      header: "Updated At",
      cell: ({ row }) => {
        const updatedAt = row.getValue("updatedAt") as string;
        const formattedDate = new Date(updatedAt).toLocaleDateString();
        return <div className="capitalize">{formattedDate}</div>;
      },
    }),
    columnHelper.display({
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const id = row.getValue("id") as string;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-xs">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-auto min-w-0">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Info</span>
                  <Info className="ml-auto" />
                </DropdownMenuItem>
                {row.getValue("role") == "user" && (
                  <DropdownMenuItem
                    onClick={async () => await props?.convertToAdmin?.(id)}
                  >
                    <span>Convert to Admin</span>
                    <User className="ml-auto" />
                  </DropdownMenuItem>
                )}
                {row.getValue("role") == "admin" && (
                  <DropdownMenuItem
                    onClick={async () => await props?.convertToUser?.(id)}
                  >
                    <span>Convert to User</span>
                    <User className="ml-auto" />
                  </DropdownMenuItem>
                )}
                {row.getValue("role") == "superuser" && (
                  <DropdownMenuItem
                    onClick={async () => await props?.convertToUser?.(id)}
                  >
                    <span>Convert to User</span>
                    <User className="ml-auto" />
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem variant="destructive">
                  <span>Delete</span>
                  <Trash className="ml-auto" />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ]);
}
