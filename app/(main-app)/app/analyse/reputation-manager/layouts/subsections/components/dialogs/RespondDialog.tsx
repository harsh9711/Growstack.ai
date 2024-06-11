// RespondDialog.js
import { MultipleStarsIcon } from "@/components/svgs";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { BsStarFill } from "react-icons/bs";
import CreateTemplateDialog from "./CreateTemplateDialog";
import { Review } from "@/types/reviews";
import RatingStars from "@/components/ui/rating";

const RespondDialog = ({ reviewData }: { reviewData: Review }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-12 py-3 px-6 border border-primary-green text-primary-green hover:text-white hover:bg-primary-green sheen rounded-xl flex gap-3 transition-all duration-300">
          Respond
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Respond to review</DialogTitle>
        </DialogHeader>
        <div>
          <div className="border border-[#E1E1E1] p-7 rounded-3xl flex gap-6">
            <div className="w-full max-w-fit flex flex-col justify-between">
              <span className="flex gap-2 font-medium items-center text-lg">
                <Image src="/icons/google.svg" alt="" width={30} height={40} />
                {reviewData.source}
              </span>
              <p className="text-primary-black text-opacity-70 text-sm">Reviewer: {reviewData.reviewer}</p>
            </div>
            <div className="w-full border-l border-[#D8D8D8] flex flex-col justify-between gap-4 pl-6">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <span className="flex gap-1">
                    <RatingStars rating={reviewData.rating} />
                  </span>
                  <span className="font-semibold">{reviewData.rating} Stars</span>
                </div>
                <span className="font-semibold">{reviewData.date}</span>
              </div>
              <p className="text-[15px] leading-relaxed">{reviewData.review}</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Respond to {reviewData.reviewer} review:</h2>
            <div className="flex gap-3 mt-3">
              <CreateTemplateDialog />
              <button className="bg-transparent hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-5 py-3 rounded-xl font-semibold flex items-center gap-2">
                <MultipleStarsIcon /> Generate AI Response
              </button>
            </div>
          </div>
          <div className="mt-8">
            <textarea className="h-[128px] w-full bg-[#F2F2F2] rounded-xl block resize-none p-4 text-[15px]" placeholder="Your reply here"></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <button className="py-3 px-6 bg-white border border-[#CF0000] text-[#CF0000] hover:bg-[#cf0000ab]/1 rounded-xl mt-6">Cancel</button>
            </DialogClose>
            <button className="py-3 px-6 bg-primary-green sheen rounded-xl text-white mt-6">Submit response</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RespondDialog;
