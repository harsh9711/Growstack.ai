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
  ImageIcon,
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
import { login } from "@/lib/features/auth/auth.slice";
import { useDispatch } from "react-redux";
import { countries } from "./data";
import { useRouter } from "next-nprogress-bar";
import clsx from "clsx";
import "@/styles/profile.css";
import { FaMoneyBill1 } from "react-icons/fa6";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = getCurrentUser();
  const [previewImage, setPreviewImage] = useState<any>("");
  const [avatarLink, setAvatarLink] = useState<any>({});
  const [changePasswordEnable, setChangePasswordEnable] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [selectedAvatarFileName, setSelectedAvatarFileName] = useState("");

  const ValidationSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    name: z.string().min(1, "Please enter a Full Name"),
    job_role: z.string().optional(),
    company_name: z.string().optional(),
    company_website: z.string().optional(),
    address_line: z.string().optional(),
    city: z.string().optional(),
    postal_code: z.string().optional(),
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
    {
      link: "/account/billings",
      icon: (
        <FaMoneyBill1 />

      ),
      title: "Billing",
    },
  ];
  const [activeTab, setActiveTab] = useState(options[0]);

  useEffect(() => {
    handleGetProfileData();
  }, []);

  const handleGetProfileData = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1`);
      const userData = response?.data?.data;
      dispatch(login(userData));
      setValue("email", userData.email);
      setValue("name", userData.name);
      setValue("job_role", userData.job_role);
      setValue("company_name", userData.company_name);
      setValue("company_website", userData.company_website);
      setValue("address_line", userData.address_line);
      setValue("postal_code", userData.postal_code);
      setValue("city", userData.city);
      setValue("country", userData.country);
      setPreviewImage(userData.profile_img);
    } catch (error) {
      console.log("Error fetching workflows:", error);
      toast.error("Error fetching profile data");
    }
  };

  const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    handleAvatarPreview(event);
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("document", file);
      try {
        const response = await instance.post(
          `${API_URL}/users/api/v1/file/upload`,
          formData
        );
        setAvatarLink(response.data.data.fileUrl);
      } catch (error) {
        toast.error("Error uploading avatar");
      }
    }
  };

  function removeNullProperties(obj: any) {
    const filteredObject = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== null) {
        // @ts-ignore
        filteredObject[key] = obj[key];
      }
    });
    return filteredObject;
  }

  const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
    setIsPending(true);
    try {
      const validatedData = ValidationSchema.parse({
        ...data,
        ...(Object.keys(avatarLink).length > 0 && { profile_img: avatarLink }),
      });
      const payload = removeNullProperties(validatedData);

      const response = await instance.put(API_URL + "/users/api/v1", payload);
      handleGetProfileData();

      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Profile Update failed:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleAvatarPreview = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedAvatarFileName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result;
      setPreviewImage(result);
    };
  };

  const handleMenuClick = (title: string) => {
    setActiveTab(title as any);
    if (title === "Delete Account") handleDeleteProfile();
    if (title === "Change password") setChangePasswordEnable(true);
    if (title === "View profile") setChangePasswordEnable(false);
    if (title === "Billing"){
      window.location.href='/account/billings/settings'
    }

  };

  const handleDeleteProfile = () => {
    swal({
      title: "Delete Account",
      text: "Are you sure you want to delete it?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await instance.delete(`${API_URL}/users/api/v1`);
          router.push("/auth/login");
        } catch (error) {
          toast.error("Error deleting profile");
        }
      } else {
      }
    });
  };

  return (
    <div className="flex-1 flex mt-10 gap-8">
      <div className="w-full max-w-md !bg-white shadow-box p-10 rounded-xl flex flex-col divide-y divide-gray-100 space-y-5">
        <div className="space-y-2 flex flex-col">
          <div className="space-y-6">
            <label
              htmlFor="profile-image"
              className="relative group flex justify-center w-28 h-28 rounded-full overflow-hidden mx-auto"
            >
              <div className="w-28 h-28">
                {previewImage ? (
                  <Image
                    src={Object(avatarLink).length ? avatarLink : previewImage}
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
              <div className="w-28 h-28 rounded-full absolute inset-0 bg-black opacity-0 group-hover:bg-black/20 group-hover:opacity-100 z-10 flex flex-col items-center justify-center text-white cursor-pointer transition">
                <ImageIcon size={35} />
              </div>
            </label>

            <div className="flex h-[54px] w-full bg-white border border-[#eee] rounded-xl text-sm justify-between">
              <div className="w-full flex items-center px-4 overflow-hidden">
                <h1 className="whitespace-nowrap overflow-hidden w-full text-ellipsis">
                  {" "}
                  {avatarLink && Object(avatarLink).length
                    ? selectedAvatarFileName || "Choose your avatar..."
                    : "Change the avatar"}
                </h1>
              </div>

              <label
                htmlFor="profile-image"
                className="w-full max-w-fit bg-primary-green text-white h-[54px] px-8 rounded-r-xl flex items-center justify-center cursor-pointer"
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
        </div>
        <div className="space-y-1.5 pt-3">
          {options.map((option, index) => (
            <div
              className={clsx(
                "flex gap-3 items-center p-3 hover:bg-gray-50 rounded-lg transition capitalize cursor-pointer",
                activeTab === option && "bg-gray-100"
              )}
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
              <div className="grid grid-cols-2 gap-x-5 gap-y-6 mt-6">
                <div className="space-y-3 w-full">
                  <label>
                    Full Name<span className="imp ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your Full Name"
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
                    placeholder="Enter your Role Job"
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
                  <label>
                    Email<span className="imp ml-1">*</span>
                  </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Enter your Email"
                    className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-rose-600 text-sm">
                      {errors.email?.message}
                    </span>
                  )}
                </div>

                <div className="space-y-3 w-full">
                  <label>Company name</label>
                  <input
                    type="text"
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
                    placeholder="Enter your Address Line"
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
                            {countries.map((country) => {
                              return (
                                <SelectItem value={country.country}>
                                  {country.country}
                                </SelectItem>
                              );
                            })}
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
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="h-12 py-3 px-3 flex justify-center w-full max-w-[150px] uppercase bg-primary-green sheen rounded-xl text-white mt-6"
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
