"use client";
import { useContext, createContext, useState } from "react";

type Callback = (event: string, args?: Record<string, string>) => void;

interface ConfirmationContext {
  callbacks: Record<string, Callback>;
  open: (name: string, args?: Record<string, string>) => void;
  subscribeCallback: (name: string, callback: Callback) => void;
  unsubscribeCallback: (name: string) => void;
}

export const ConfirmationDialogContext = createContext<ConfirmationContext>({
  callbacks: {},
  open: () => {},
  subscribeCallback: () => {},
  unsubscribeCallback: () => {},
});

export const useDialog = () => useContext(ConfirmationDialogContext);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [callbacks, setCallbacks] = useState<Record<string, Callback>>({});

  const unsubscribeCallback = (name: string) => {
    setCallbacks((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  const subscribeCallback = (name: string, callback: Callback) => {
    setCallbacks((prev) => ({ ...prev, [name]: callback }));
  };

  const open = (name: string, args?: Record<string, string>) => {
    const callback = callbacks[name];
    if (callback) callback("open", args);
  };

  return (
    <ConfirmationDialogContext.Provider
      value={{
        callbacks,
        open,
        subscribeCallback,
        unsubscribeCallback,
      }}
    >
      {children}
    </ConfirmationDialogContext.Provider>
  );
};
