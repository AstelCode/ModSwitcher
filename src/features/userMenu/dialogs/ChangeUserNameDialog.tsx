"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UpdateUsernameAction } from "@/core/presentation/user/UpdateUserName.action";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ChangeUserNameDialog() {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    const result = await UpdateUsernameAction(formData);
    if (result.error) {
      toast.error(result.error, {
        position: "top-center",
      });
      return;
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="text-base">
          Edit
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-60">
        <DialogHeader>
          <DialogTitle>Change Username</DialogTitle>
        </DialogHeader>
        <form action={handleAction} className="h-full">
          <FieldGroup className="pb-4">
            <Field>
              <FieldLabel>New username</FieldLabel>
              <Input type="text" name="username" placeholder="new username" />
            </Field>
            <Field>
              <FieldLabel>Current Password</FieldLabel>
              <Input type="text" placeholder="password" name="password" />
            </Field>
          </FieldGroup>
          <DialogFooter className="md:justify-between">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Accept</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
