"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import {
  Edit,
  KeyIcon,
  Settings2Icon,
  ShieldCheckIcon,
  UserIcon as UserIcon2,
  UserX2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { ChangeEvent } from "react";
import swal from "sweetalert";
import ChangePassword from "./components/ChangePassword";
import Spinner from "@/components/Spinner";

export default function ProfilePage() {
  const currentUser = getCurrentUser();
  const [previewImage, setPreviewImage] = useState<any>(null);
  const [avatarLink, setAvatarLink] = useState<any>({});
  const [changePasswordEnable, setChangePasswordEnable] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const ValidationSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    name: z.string().nonempty("Please enter a Full Name"),
    job_role: z.string().nonempty("Please enter a role"),
    company_name: z.string().nonempty("Please enter a Company Name"),
    company_website: z.string().url("Please enter a Company Website"),
    address_line: z.string().nonempty("Please enter a Address Line"),
    city: z.string().nonempty("Please enter a city"),
    postal_code: z.string().nonempty("Please enter a Postal Code"),
    country: z.string().optional(),
    profile_img: z.any().optional(),
  });

  type ValidationSchemaType = z.infer<typeof ValidationSchema>;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      email: "",
      name: "",
      job_role: "",
      company_name: "",
      company_website: "",
      address_line: "",
      city: "",
      postal_code: "",
      country: "",
      profile_img: null,
    },
  });

  const options = [
    {
      link: "#",
      icon: <UserIcon2 />,
      title: "View profile",
    },
    // {
    //   link: "#",
    //   icon: <Settings2Icon />,
    //   title: "set defaults",
    // },
    {
      link: "#",
      icon: <KeyIcon />,
      title: "Change password",
    },
    // {
    //   link: "#",
    //   icon: <ShieldCheckIcon />,
    //   title: "2FA Authentication",
    // },
    {
      link: "#",
      icon: <UserX2 />,
      title: "Delete Account",
    },
  ];

  useEffect(() => {
    handleGetProfileData();
  }, []);

  const handleGetProfileData = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1`);
      const userData = response?.data?.data;
      setValue("email", userData.email);
      setValue("name", userData.name);
      setValue("job_role", userData.job_role);
      setValue("company_name", userData.company_name);
      setValue("company_website", userData.company_website);
      setValue("address_line", userData.address_line);
      setValue("postal_code", userData.postal_code);
      setValue("city", userData.city);
      setValue("country", userData.country);
    } catch (error) {
      console.log("Error fetching workflows:", error);
      toast.error("Error fetching profile data");
    }
  };

  // const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   console.log("FIL", file);
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("document", file);
  //     try {
  //       const response = await instance.post(
  //         `${API_URL}/users/api/v1/file/upload`,
  //         formData
  //       );
  //       setAvatarLink(response.data.data.fileUrl);
  //     } catch (error) {
  //       toast.error("Error uploading avatar");
  //     }
  //   }
  // };

  const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
    setIsPending(true);
    try {
      const validatedData = ValidationSchema.parse({
        ...data,
        // profile_img: avatarLink,
      });
      const response = await instance.put(
        API_URL + "/users/api/v1",
        validatedData
      );
      handleGetProfileData();

      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Profile Upa]date failed:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result;
      setPreviewImage(result);
    };
  };

  const handleMenuClick = (title: string) => {
    if (title === "Delete Account") handleDeleteProfile();
    if (title === "Change password") setChangePasswordEnable(true);
    if (title === "View profile") setChangePasswordEnable(false);
  };

  const handleDeleteProfile = () => {
    swal({
      title: "Delete Profile",
      text: "Are you sure you want to delete it?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await instance.delete(`${API_URL}/users/api/v1`);
        } catch (error) {
          toast.error("Error deleting profile");
        }
      } else {
      }
    });
  };

  return (
    <div className="flex-1 flex mt-10 gap-8">
      <div className="w-full max-w-md !bg-white shadow-box p-10 rounded-xl flex flex-col divide-y divide-gray-200 space-y-5">
        <div className="space-y-2 flex flex-col items-center">
          <div className="max-w-fit space-y-6">
            <label
              htmlFor="profileImage"
              className="relative group w-28 h-28 rounded-full overflow-hidden"
            >
              <div className="w-28 h-28">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt=""
                    width={100}
                    height={100}
                    className="h-28 w-28 object-cover rounded-full"
                  />
                ) : (
                  <div className="h-28 w-28 bg-gray-200 rounded-full grid place-content-center text-3xl font-medium uppercase">
                    {currentUser?.email?.slice(0, 1)}
                  </div>
                )}
              </div>
              <div className="w-28 h-28 rounded-full absolute inset-0 bg-black opacity-0 group-hover:bg-black/50 group-hover:opacity-100 z-10 flex flex-col items-center justify-center text-white cursor-pointer transition">
                <BiPencil size={35} />
              </div>
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              // className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <h2 className="text-2xl font-semibold">Admin</h2>
          <p>Administrator</p>
        </div>
        <div className="flex justify-between pt-6">
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-2xl font-semibold">981.2K</h2>
            <p className="text-gray-400">Words Left</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-2xl font-semibold">981.2K</h2>
            <p className="text-gray-400">Words Left</p>
          </div>
        </div>
        <div className="space-y-1.5 mt-8 pt-6">
          {options.map((option, index) => (
            <div
              className="flex gap-3 items-center p-3 hover:bg-gray-50 rounded-lg transition capitalize"
              key={index}
              onClick={() => handleMenuClick(option.title)}
            >
              {option.icon}
              <h1 className="text-sm">{option.title}</h1>
            </div>
          ))}
        </div>
      </div>
      {!changePasswordEnable ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full !bg-white shadow-box p-10 rounded-xl flex flex-col"
        >
          <div className="flex-1">
            <h1 className="border-b pb-4 flex items-center gap-3 font-semibold text-xl">
              <Edit size={20} />
              Edit your profile
            </h1>
            <div>
              {/* <form onSubmit={handleSubmit(onSubmit)}> */}
              <div className="grid grid-cols-2 gap-x-5 gap-y-6 mt-6">
                <div className="space-y-3 w-full">
                  <label>Full Name</label>
                  <input
                    type="text"
                    id="name"
                    // name="fullName"
                    placeholder="Full Name"
                    className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm"
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="text-rose-600 text-sm">
                      {errors.name?.message}
                    </span>
                  )}
                </div>
                <div className="space-y-3 w-full">
                  <label>Role job</label>
                  <input
                    type="text"
                    // name="role"
                    placeholder="Enter your role job"
                    // value="Administrator"
                    className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm"
                    {...register("job_role")}
                  />
                  {errors.job_role && (
                    <span className="text-rose-600 text-sm">
                      {errors.job_role?.message}
                    </span>
                  )}
                </div>
                <div className="space-y-3 w-full">
                  <label>Email</label>
                  <input
                    id="email"
                    type="text"
                    // name="email"
                    placeholder="Enter your email"
                    // value="admin@gmail.com"
                    className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-rose-600 text-sm">
                      {errors.email?.message}
                    </span>
                  )}
                </div>
                {/* <div className="flex items-center gap-5">
                  <div className="w-full space-y-3">
                    <h1>Change avatar</h1>
                    <div className="hidden sm:flex h-[54px] w-full bg-white border border-[#eee] rounded-xl text-sm justify-between">
                      <div className="flex-1 flex items-center px-4">
                        <h1>Choose your avatar...</h1>
                      </div>

                      <label
                        htmlFor="profile-image"
                        className="bg-primary-green text-white h-[54px] px-8 rounded-r-xl flex items-center justify-center cursor-pointer"
                      >
                        Browse
                      </label>
                      <input
                        type="file"
                        id="profile-image"
                        accept="images/*"
                        className="hidden"
                        onChange={handleChangeAvatar}
                      />
                    </div>
                  </div>
                </div> */}
                <div className="space-y-3 w-full">
                  <label>Company name</label>
                  <input
                    type="text"
                    // name="company-name"
                    placeholder="Enter your Company name"
                    className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm"
                    {...register("company_name")}
                  />
                  {errors.company_name && (
                    <span className="text-rose-600 text-sm">
                      {errors.company_name?.message}
                    </span>
                  )}
                </div>
                <div className="space-y-3 w-full">
                  <label>Company website</label>
                  <input
                    type="url"
                    // name="company-website"
                    placeholder="Enter your Company website"
                    className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm"
                    {...register("company_website")}
                  />
                  {errors.company_website && (
                    <span className="text-rose-600 text-sm">
                      {errors.company_website?.message}
                    </span>
                  )}
                </div>

                <div className="space-y-3 w-full">
                  <label>Address Line</label>
                  <input
                    type="text"
                    // name="address-line"
                    placeholder="Your Address Line"
                    className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm"
                    {...register("address_line")}
                  />
                  {errors.address_line && (
                    <span className="text-rose-600 text-sm">
                      {errors.address_line?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-x-5 gap-y-6 mt-6">
                <div className="space-y-3 w-full">
                  <label>City</label>
                  <input
                    type="text"
                    // name="city"
                    placeholder="Enter your City"
                    className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm"
                    {...register("city")}
                  />
                  {errors.city && (
                    <span className="text-rose-600 text-sm">
                      {errors.city?.message}
                    </span>
                  )}
                </div>
                <div className="space-y-3 w-full">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    // name="postal-code"
                    placeholder="Enter your Postal Code"
                    className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm"
                    {...register("postal_code")}
                  />
                  {errors.postal_code && (
                    <span className="text-rose-600 text-sm">
                      {errors.postal_code?.message}
                    </span>
                  )}
                </div>

                <div className="space-y-3 w-full">
                  <label>Country</label>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <SelectTrigger className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm bg-white">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="USA">USA</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="UK">UK</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.country && (
                    <span className="text-rose-600 text-sm">
                      {errors.country?.message}
                    </span>
                  )}
                </div>
              </div>
              {/* </form> */}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="h-12 py-3 px-3 w-full max-w-[150px] uppercase border border-primary-green text-primary-green hover:bg-primary-green/10 rounded-xl mt-6"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-12 py-3 px-3 w-full max-w-[150px] uppercase bg-primary-green sheen rounded-xl text-white mt-6"
            >
              {isPending ? <Spinner /> : " Update"}
            </button>
          </div>
        </form>
      ) : (
        <ChangePassword />
      )}
    </div>
  );
}
