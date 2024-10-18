import React from "react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export default function ImageDialog({ imageSrc }: { imageSrc: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img src={imageSrc} alt="" width={300} height={300} className="rounded-2xl cursor-pointer" />
        {/* <Image src={imageSrc} alt="" width={300} height={300} className="rounded-2xl cursor-pointer" /> */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Image preview</DialogTitle>
        </DialogHeader>
        <img src={imageSrc} alt="" width={1000} height={1000} className="rounded-2xl" />
        {/* <Image src={imageSrc} alt="" width={1000} height={1000} className="rounded-2xl" /> */}
      </DialogContent>
    </Dialog>
  );
}
