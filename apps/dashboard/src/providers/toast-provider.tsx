"use client";

import { Toaster as SonnerToaster } from "@repo/ui/components/sonner";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SonnerToaster richColors closeButton position="bottom-right" />
    </>
  );
}
