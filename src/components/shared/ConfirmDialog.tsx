"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useDialog } from "@/hooks/DialogContext";

export const ConfirmDialog = ({
  name,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: {
  name: string;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (args: Record<string, string>) => Promise<void>;
  onCancel?: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  const { subscribeCallback, unsubscribeCallback } = useDialog();
  const [args, setArgs] = useState<Record<string, string> | undefined>({});

  useEffect(() => {
    subscribeCallback(name, (event: string, args?: Record<string, string>) => {
      setOpen(true);
      setArgs(args);
    });

    return () => {
      unsubscribeCallback(name);
    };
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(false);
              onCancel?.();
            }}
          >
            {cancelText ?? "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setOpen(false);
              onConfirm?.(args ?? {});
            }}
          >
            {confirmText ?? "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
