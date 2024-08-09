"use client";
import Spinner from "@/components/Spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import clsx from "clsx";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowCircleLeft } from "react-icons/fa";

const SaveProspects = ({ places }: { places: Place[] }) => {
  const [isPending, setIsPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileTitle, setFileTitle] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    setIsPending(true);

    try {
      const businesses = places.map((place) => ({
        business_name: place.title,
        business_phone_number: place.phoneNumber ? Number(place.phoneNumber.replace(/\D/g, "")) : 0,
        address: place.address,
        rating: place.rating,
        rating_count: place.ratingCount,
        country: "India",
        state: "haryana",
        city: "Gurgaon",
        zip_code: "12117",
        website: place.website || "",
        business_contact: {
          first_name: "Swapnil",
          last_name: "Amin",
          email: "swapnil@webbuddy.agency",
          phone: place.phoneNumber ? Number(place.phoneNumber.replace(/\D/g, "")) : 0,
        },
      }));

      const data = {
        title: fileTitle,
        businesses: businesses,
      };

      const response = await instance.post(`${API_URL}/users/api/v1/contacts/prospects/save`, data);
      toast.success("Data saved successfully!");

      setTimeout(() => {
        router.push(`/app/plan/contacts?tab=1`);
      }, 10);
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsPending(false);
      setIsModalOpen(false);
    }
  };

  const handleModalSubmit = () => {
    if (fileTitle.trim() === "") {
      return toast.error("Title is required.");
    }
    handleSave();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <button
          className={clsx(
            "mx-auto mt-4 w-[160px] text-xl h-14 flex items-center justify-center bg-primary-green rounded-xl sheen text-white",
            isPending && "bg-opacity-90"
          )}
          disabled={isPending}>
          Save
          <FaArrowCircleLeft className="rotate-180 text-white ml-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Save prospects</DialogTitle>
        </DialogHeader>
        <input
          type="text"
          value={fileTitle}
          onChange={(e) => setFileTitle(e.target.value)}
          className="w-full h-12 p-2 mb-4 border rounded-lg"
          placeholder="Enter file title"
        />
        <div className="flex justify-end z-[40] relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="w-[100px] h-12 px-4 py-2 mr-2 text-white bg-gray-500 rounded-xl flex justify-center items-center">
            Cancel
          </button>
          <button onClick={handleModalSubmit} className="w-[100px] h-12 px-4 py-2 text-white bg-primary-green rounded-xl flex justify-center items-center">
            {isPending ? <Spinner /> : "Submit"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveProspects;
