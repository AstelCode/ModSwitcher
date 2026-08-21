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
import { PasswordValidation } from "@/features/auth/signup/PasswordValidationInput";
import { Edit } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export function ChangePasswordDialog() {
  const onClick = () => {
    toast.error("Mensaje error", {
      position: "top-center",
    });
  };
  return (
    <Dialog>
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
        <FieldGroup>
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
            <PasswordValidation />
          </Field>
        </FieldGroup>
        <DialogFooter className="items-center justify-between sm:justify-between">
          <DialogClose asChild>
            <Button variant="secondary" value="Cancel">
              Cancel
            </Button>
          </DialogClose>
          <Button size="lg" value="Submit" onClick={onClick}>
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
