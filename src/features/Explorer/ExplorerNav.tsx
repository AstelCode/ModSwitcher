"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { UserJson } from "@/core/domain/model/user";
import { GetUserAction } from "@/core/presentation/user";
import { ROUTES } from "@/lib/constants/routes";
import { ChevronDown, CircleIcon, CircleUser, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ExplorerNav() {
  const [user, setUser] = useState<UserJson | null>(null);
  const router = useRouter();
  const handleClick = () => {
    router.push(ROUTES.AUTH_LOGIN);
  };

  useEffect(() => {
    const func = async () => {
      const user = await GetUserAction();
      setUser(user);
    };
    func();
  }, []);
  return (
    <div className="w-full bg-card h-14 items-center grid grid-cols-[100px_1fr_140px] gap-2 p-2">
      <div />
      <div className="flex justify-center items-center">
        <InputGroup className="max-w-xl">
          <InputGroupInput placeholder="Search" />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex items-center justify-center">
        {!user && (
          <div className="flex items-center justify-center gap-3">
            <Button onClick={handleClick}>Sign In</Button>
          </div>
        )}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex gap-1.5 items-center justify-center cursor-pointer">
                {user.avatar && (
                  <Avatar>
                    <AvatarImage src={user.avatar.externalUrl!} />
                  </Avatar>
                )}
                {!user.avatar && <CircleUser size={30} />}
                <span>{user.username}</span>
                <ChevronDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>Login</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
