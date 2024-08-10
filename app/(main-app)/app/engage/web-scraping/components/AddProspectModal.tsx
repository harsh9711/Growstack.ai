"use client";
import { countries } from "@/app/(main-app)/account/profile/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import "leaflet/dist/leaflet.css";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Place {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  phoneNumber: string;
  rating: number;
  ratingCount: number;
  website: string;
  category: string;
}
interface AddProspectProps {
  onProspectAdded: (newProspect: Place) => void;
}

const AddProspectModal: React.FC<AddProspectProps> = ({ onProspectAdded }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [prospects, setProspects] = useState<Place[]>([]);
  const [formData, setFormData] = useState({
    businessName: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    website: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newProspect: Place = {
      latitude: 0, // Replace with actual latitude
      longitude: 0, // Replace with actual longitude
      title: formData.businessName,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      rating: 0, // Replace with actual rating if available
      ratingCount: 0, // Replace with actual rating count if available
      website: formData.website,
      category: "Custom", // Replace with actual category if available
    };
    toast.success("Prospect added!");
    onProspectAdded(newProspect);
    setProspects([...prospects, newProspect]);
    resetFormData();
    setIsOpen(false);
  };

  const resetFormData = () => {
    return setFormData({
      businessName: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      website: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="flex items-center gap-3 hover:bg-primary-green/10 sheen min-w-fit py-3 px-4 rounded-lg transition-all duration-300">
            Add prospect manually
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add prospect</DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-5">
            <div className="space-y-2">
              <label className="font-medium">
                Business name <span className="text-[#F00]">*</span>
              </label>
              <Input type="text" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Type your Business name" />
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Business phone number <span className="text-[#F00]">*</span>
              </label>
              <Input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Type your phone number" />
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Address <span className="text-[#F00]">*</span>
              </label>
              <Input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Type Business Address" />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="font-medium">
                  City <span className="text-[#F00]">*</span>
                </label>
                <Input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Type City" />
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  State <span className="text-[#F00]">*</span>
                </label>
                <Input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Type State" />
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Country <span className="text-[#F00]">*</span>
                </label>
                <Select
                  value={formData.country as any}
                  onValueChange={(value) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      country: value,
                    }));
                  }}>
                  <SelectTrigger className="w-full border-none">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(({ country }) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Zip code <span className="text-[#F00]">*</span>
                </label>
                <Input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Type Zip code" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Website <span className="text-[#F00]">*</span>
              </label>
              <Input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="Type Website URL" />
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={isChecked} onCheckedChange={() => setIsChecked((prev) => !prev)} />
              Do you have a point of contact at this business?
            </div>
            {isChecked && (
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="font-medium">First name</label>
                  <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Type First name" />
                </div>
                <div className="space-y-2">
                  <label className="font-medium">Last name</label>
                  <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Type Last name" />
                </div>
                <div className="space-y-2">
                  <label className="font-medium">Email</label>
                  <Input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Type Email" />
                </div>
                <div className="space-y-2">
                  <label className="font-medium">Phone</label>
                  <Input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Type Phone" />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4 w-full">
              <button
                className="py-3.5 h-14 w-full max-w-[140px] px-6 bg-white border text-primary-green border-primary-green  rounded-xl mt-6"
                onClick={resetFormData}>
                Reset
              </button>
              <button
                className="py-3.5 h-14 w-full max-w-[200px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap"
                onClick={handleSubmit}>
                Save Prospect{" "}
                <span className="relative p-2 text-primary-green bg-white rounded-full">
                  <ArrowRight size={20} />
                </span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProspectModal;
