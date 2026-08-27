"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { type DataTableFeatures } from "./UserTableFeatures";
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
import { UserJson, UserStatus } from "@/core/domain/model";
import { UserRole } from "@/core/infrastructure/repositories/prisma/connection/enums";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const columnHelper = createColumnHelper<DataTableFeatures, UserJson>();

interface GetColumnsProps {
  onDelete?: (id: string) => Promise<void>;
  convertToAdmin?: (id: string) => Promise<void>;
  convertToUser?: (id: string) => Promise<void>;
  deleteUser?: (id: string) => Promise<void>;
  info?: (id: string) => Promise<void>;
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
    columnHelper.accessor("avatar", {
      header: "Avatar",
      cell: ({ row }) => {
        const username = row.original.username as string;
        const avatarUrl = row.original.avatar?.externalUrl as string;
        return avatarUrl ? (
          <div className="size-9.5 rounded-full overflow-hidden mx-auto">
            <Avatar className="w-full h-full">
              <AvatarImage src={avatarUrl} alt={username} />
            </Avatar>
          </div>
        ) : (
          <User className="mx-auto" />
        );
      },
    }),
    columnHelper.accessor("username", {
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("username")}</div>
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
      filterFn: "equalsString",
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
      filterFn: "equalsString",
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
        const id = row.original.id;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-xs">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 min-w-0">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={async () => await props?.info?.(id)}>
                  <span>Info</span>
                  <Info className="ml-auto" />
                </DropdownMenuItem>
                {row.getValue("role") == "user" && (
                  <DropdownMenuItem
                    onClick={async () => await props?.convertToAdmin?.(id)}
                  >
                    <span>Convert to Admin</span>
                    <User className="ml-auto size-5" />
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
                <DropdownMenuItem
                  variant="destructive"
                  onClick={async () => await props?.deleteUser?.(id)}
                >
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
