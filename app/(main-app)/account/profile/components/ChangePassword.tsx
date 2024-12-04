import React, { useState } from "react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Edit } from "lucide-react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaEdit } from "react-icons/fa";

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const ValidationSchema = z.object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password can't exceed 20 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])/,
        "Password must contain at least one uppercase letter and one special character"
      ),
    oldPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password can't exceed 20 characters"),
  });

  type ValidationSchemaType = z.infer<typeof ValidationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(ValidationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchemaType> = async data => {
    try {
      const validatedData = ValidationSchema.parse(data);
      const response = await instance.put(
        API_URL + "/users/api/v1/change-password",
        validatedData
      );

      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Change password failed:", error);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full !bg-white shadow-box p-10 rounded-xl flex flex-col"
      >
        <div className="flex-1">
          <h1 className="border-b pb-4 flex items-center gap-3 font-semibold text-xl">
            <FaEdit size={20} />
            Edit your password
          </h1>
          <div>
            <div className="grid lg:grid-cols-2 gap-x-5 gap-y-6 mt-6 md:grid-cols-1">
              <div className="space-y-3 w-full min-w-[150px] relative">
                <label>Old Password</label>
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter Your Old Password"
                  className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm pr-10"
                  {...register("oldPassword")}
                />
                <div
                  className="absolute right-3 top-[42px] cursor-pointer"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
                {errors.oldPassword && (
                  <span className="text-rose-600 text-sm">
                    {errors.oldPassword?.message}
                  </span>
                )}
              </div>
              <div className="space-y-3 w-full relative">
                <label>New Password</label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter Your New Password"
                  className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm pr-10"
                  {...register("newPassword")}
                />
                <div
                  className="absolute right-3 top-[42px] cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
                {errors.newPassword && (
                  <span className="text-rose-600 text-sm">
                    {errors.newPassword?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="h-12 py-3 px-3 w-full max-w-[150px] uppercase border border-[#2DA771] text-[#2DA771] hover:bg-primary-green/10 rounded-xl mt-6"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-12 py-3 px-3 w-full min-w-[200px] max-w-[200px] uppercase bg-[#2DA771] sheen rounded-xl text-white mt-6"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
