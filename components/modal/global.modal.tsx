import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface GlobalModalProps {
  open: boolean;
  setOpen: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  disableCloseOnOverlayClick?: boolean;
}

export const GlobalModal: React.FC<GlobalModalProps> = ({
  title,
  children,
  className,
  open,
  setOpen,
  showCloseButton = true,
  disableCloseOnOverlayClick = false,
}) => {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          disableCloseOnOverlayClick={disableCloseOnOverlayClick}
          showCloseButton={showCloseButton}
          className={cn(
            "w-[80%] md:w-[980%] max-w-2xl p-0 border-0",
            className
          )}
        >
          <DialogHeader>
            {title && (
              <DialogTitle>
                <div className="bg-white px-6 py-2 text-white font-inter">
                  <p className="text-lg font-semibold">{title}</p>
                </div>
              </DialogTitle>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GlobalModal;
