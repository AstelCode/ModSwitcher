/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactTable, useTable } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { features } from "./user-table-features";
import { getColumns, UserItem } from "./user-table-columns";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function TableFilter({ table }: { table: ReactTable<any, UserItem, any> }) {
  const statusList = ["active", "inactive"];
  const options = ["name", "email"];
  const roles = ["superuser", "user", "admin"];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  function handleFilterSelect(option: string) {
    setSelectedOption(option);
  }

  function handleSelectStatus(option: string) {
    table.getColumn("status")?.setFilterValue(option);
  }

  function handleSelectRole(option: string) {
    table.getColumn("role")?.setFilterValue(option);
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder={`Filter ${selectedOption}s...`}
        value={
          (table.getColumn(selectedOption)?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn(selectedOption)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <Select defaultValue={selectedOption} onValueChange={handleFilterSelect}>
        <SelectTrigger className="w-45 min-w-0">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Filters</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={handleSelectStatus}>
        <SelectTrigger className="w-45 min-w-0">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="">Empty</SelectItem>
            {statusList.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={handleSelectRole}>
        <SelectTrigger className="w-45 min-w-0">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Role</SelectLabel>
            <SelectItem value="">Empty</SelectItem>
            {roles.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export function DataTable() {
  const columns = getColumns({
    convertToAdmin: async (id) => {
      console.log(id);
    },
  });
  const data: UserItem[] = [
    {
      id: "hola",
      name: "sax",
      email: "email1@gmail.com",
      role: "superuser",
      status: "inactive",
      avatarUrl: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  const table = useTable({
    features,
    data,
    columns,
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <TableFilter table={table as any} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuGroup>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
