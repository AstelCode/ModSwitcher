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
import { UpdatePasswordAction } from "@/core/presentation/user/UpdatePassword.action";
import { PasswordValidation } from "@/features/auth/signup/PasswordValidationInput";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ChangePasswordDialog() {
  const [hasError, setHasError] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleAction = async (formData: FormData) => {
    if (hasError) {
      return;
    }
    const state = await UpdatePasswordAction(formData);
    if (state.error) {
      toast.error(state.error, {
        position: "top-center",
      });
      return;
    }
    setOpen(false);
  };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="lg" className="text-base">
          Edit
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <form action={handleAction}>
          <FieldGroup className="mb-4">
            <Field>
              <FieldLabel>Last password</FieldLabel>
              <Input
                type="text"
                placeholder="Last password"
                name="lastPassword"
                required
              />
            </Field>
            <Field>
              <FieldLabel>New password</FieldLabel>
              <PasswordValidation hasError={setHasError} />
            </Field>
          </FieldGroup>
          <DialogFooter className="items-center justify-between sm:justify-between">
            <DialogClose asChild>
              <Button variant="secondary" value="Cancel">
                Cancel
              </Button>
            </DialogClose>
            <Button size="lg" value="Submit" type="submit">
              Accept
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
