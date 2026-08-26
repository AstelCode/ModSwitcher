/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserJson } from "@/core/domain/model";
import { UserRole } from "@/core/infrastructure/repositories/prisma/connection/client";

export function UserTableFilter({
  table,
}: {
  table: ReactTable<any, UserJson, any>;
}) {
  const statusList = ["active", "inactive"];
  const options = ["username", "email"];
  const roles: UserRole[] = ["user", "admin"];

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
