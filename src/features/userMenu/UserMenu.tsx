import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  CircleUser,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import { ProfileDialog } from "../profile/ProfileDialog";
import { useState } from "react";
import { LogoutAction } from "@/core/presentation/user";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { useUserContext } from "@/hooks/UserContext";

export function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const user = useUserContext();
  const onLogOut = async () => {
    await LogoutAction();
  };

  const handleClick = () => {
    router.push(ROUTES.AUTH_LOGIN);
  };

  const handleDashboard = () => {
    router.push(ROUTES.DASHBOARD);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center gap-3">
        <Button onClick={handleClick}>Sign In</Button>
      </div>
    );
  }

  return (
    <>
      <ProfileDialog open={open} onOpenChange={setOpen} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-1.5 items-center justify-center cursor-pointer">
            {user.avatar && (
              <div className="size-9.5 rounded-full overflow-hidden mx-auto">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src={user.avatar.externalUrl!}
                    alt={user.username!}
                  />
                </Avatar>
              </div>
            )}
            {!user.avatar && <CircleUser size={30} />}
            <span>{user.username}</span>
            <ChevronDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            {(user.role == "superuser" || user.role == "admin") && (
              <DropdownMenuItem onClick={handleDashboard}>
                <LayoutDashboard />
                Dashboard
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => setOpen(!open)}>
              <User />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={onLogOut}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
