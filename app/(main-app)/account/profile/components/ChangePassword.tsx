import React from "react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Edit } from "lucide-react";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const ValidationSchema = z.object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password can't exceed 20 characters"),
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

  const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
    // setIsPending(true);
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
      console.error("Login failed:", error);
    } finally {
      // setIsPending(false);
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
            <Edit size={20} />
            Edit your password
          </h1>
          <div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-6 mt-6">
              <div className="space-y-3 w-full">
                <label>Old Password</label>
                <input
                  type="text"
                  id="name"
                  // name="oldPassword"
                  placeholder="Enter Your Old Password"
                  className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm"
                  {...register("oldPassword")}
                />
                {errors.oldPassword && (
                  <span className="text-rose-600 text-sm">
                    {errors.oldPassword?.message}
                  </span>
                )}
              </div>
              <div className="space-y-3 w-full">
                <label>New Password</label>
                <input
                  type="text"
                  // name="role"
                  placeholder="Enter Your New Password"
                  // value="Administrator"
                  className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm"
                  {...register("newPassword")}
                />
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
            type="submit"
            className="h-12 py-3 px-3 w-full max-w-[150px] uppercase border border-primary-green text-primary-green hover:bg-primary-green/10 rounded-xl mt-6"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-12 py-3 px-3 w-full max-w-[220px] uppercase bg-primary-green sheen rounded-xl text-white mt-6"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
