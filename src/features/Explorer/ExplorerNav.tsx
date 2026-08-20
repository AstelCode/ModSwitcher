"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { UserJson } from "@/core/domain/model/user";
import { LogoutAction } from "@/core/presentation/user";
import { ROUTES } from "@/lib/constants/routes";
import {
  ChevronDown,
  CircleUser,
  LogOut,
  SearchIcon,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordValidation } from "../auth/signup/PasswordValidationInput";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

export function ProfileDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80vw] h-[80vh] max-w-none sm:max-w-none overflow-hidden">
        <SidebarProvider
          className="max-h-[80vh] min-h-none "
          style={{ "--sidebar-width": "10rem" } as React.CSSProperties}
        >
          <Sidebar className="min-h-none overflow-hidden">
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <div className="flex items-center gap-2">
                        <User size={20} />
                        <span>Profile</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="bg-card">
            <div className="grid grid-cols-[auto_1fr] gap-4 grid-rows-[auto_20px]">
              <div className="flex items-center">
                <div className="w-40 h-40 rounded-full bg-background"></div>
              </div>
              <div className="">
                <FieldGroup>
                  <Field>
                    <FieldLabel>Username</FieldLabel>
                    <Input />
                  </Field>
                  <Field>
                    <PasswordValidation />
                  </Field>
                </FieldGroup>
              </div>
              <div className="col-span-2  flex justify-center h-10">
                <Button>Save</Button>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}

export function ExplorerNav({ user }: { user: UserJson | null }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(ROUTES.AUTH_LOGIN);
  };
  const onLogOut = async () => {
    await LogoutAction();
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <ProfileDialog open={open} onOpenChange={setOpen} />
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
          )}
        </div>
      </div>
    </>
  );
}
