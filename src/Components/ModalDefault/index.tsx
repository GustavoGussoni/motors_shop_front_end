import { Dialog } from "@headlessui/react";
import React from "react";

interface iModalDefault {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalDefault = ({ children, open, setOpen }: iModalDefault) => {
  return (
    <Dialog
      className="relative z-50"
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">{children}</div>
    </Dialog>
  );
};
