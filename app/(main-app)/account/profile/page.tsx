"use client";
import React, { useState } from "react";

const Page = () => {
  const years = [
    {
      label: "1st Year",
      value: "1st Year",
    },
    {
      label: "2nd Year",
      value: "2nd Year",
    },
    {
      label: "3rd Year",
      value: "3rd Year",
    },
    {
      label: "4th Year",
      value: "4th Year",
    },
    {
      label: "Passed Out",
      value: "Passed Out",
    },
  ];

  return (
    <div className="mt-10">
      <form className="flex flex-col xl:flex-row gap-6">
        <section className="bg-white px-4 sm:px-8 py-6 lg:p-14 w-full rounded-[20px] md:rounded-[40px] shadow-xl shadow-gray-100">
          <h1 className="text-2xl font-semibold capitalize leading-loose">Personal Information </h1>
          <div className="flex items-center gap-5 mt-6">
            <div className="bg-primary-green grid place-content-center h-20 max-w-20 rounded-full w-full">
              <h1 className="text-white text-3xl">J</h1>
            </div>
            <div className="w-full space-y-4">
              <h1>
                Profile Image <span className="text-primary-green">(Image size must be less than 1MB*)</span>
              </h1>
              <div className="hidden sm:flex h-[54px] w-full border border-[#eee] rounded-xl text-sm justify-between">
                <div className="flex-1 flex items-center px-4">
                  <h1>Profile Image</h1>
                </div>

                <label
                  htmlFor="profile-image"
                  className="bg-primary-green text-white h-[54px] px-8 rounded-r-xl flex items-center justify-center cursor-pointer">
                  Browse
                </label>
                <input type="file" id="profile-image" accept="images/*" className="hidden" />
              </div>
            </div>
          </div>
          <div className="h-[54px] w-full border border-[#eee] rounded-xl text-sm flex sm:hidden justify-between mt-5">
            <div className="flex-1 flex items-center px-4">
              <h1>Profile Image</h1>
            </div>

            <label htmlFor="profile-image" className="bg-primary-green text-white h-[54px] px-8 rounded-r-xl flex items-center justify-center cursor-pointer">
              Browse
            </label>
            <input type="file" id="profile-image" accept="images/*" className="hidden" />
          </div>
          <div className="flex flex-col space-y-7 mt-6">
            <div className="flex flex-col sm:flex-row gap-x-6 w-full gap-y-6">
              <div className="space-y-3 w-full">
                <label>Full Name</label>
                <input type="text" name="fullName" placeholder="Full Name" className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm" />
              </div>
              <div className="space-y-3 w-full">
                <label>Email</label>
                <input type="text" name="email" placeholder="Enter your email" className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-x-6 w-full gap-y-6">
              <div className="space-y-3 w-full">
                <label>Contact</label>
                <input
                  type="text"
                  name="contact"
                  placeholder="Enter your contact number"
                  className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm"
                />
              </div>
              <div className="space-y-3 w-full">
                <label>College Name</label>
                <input
                  type="text"
                  name="collegeName"
                  placeholder="Enter your college name"
                  className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-x-6 w-full gap-y-6">
              <div className="space-y-3 w-full">
                <label>Branch</label>
                <input type="text" name="branch" placeholder="Your branch" className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm" />
              </div>
              <div className="space-y-3 w-full">
                <label>Year</label>
                {/* <input name="year" className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm">
                  {years.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </input> */}
              </div>
            </div>
            <button type="submit" className="bg-primary-green px-12 py-4 rounded-xl text-white self-end">
              Update
            </button>
          </div>
        </section>

        <section className="space-y-6 w-full xl:w-3/5">
          <div className="bg-white px-4 sm:px-8 py-6 lg:p-14 w-full rounded-[20px] md:rounded-[40px] shadow-xl shadow-gray-100 space-y-2">
            <h1 className="text-2xl font-semibold capitalize leading-loose">Package Information </h1>
            <p className="font-semibold">
              Package Type : <span className="text-primary-green underline font-normal">free</span>
            </p>
          </div>
          <div className="bg-white px-4 sm:px-8 py-6 lg:p-14 w-full rounded-[20px] md:rounded-[40px] shadow-xl shadow-gray-100 space-y-6">
            <h1 className="text-2xl font-semibold capitalize leading-loose">Reset Password</h1>
            <div className="space-y-3 w-full">
              <label className="font-semibold">
                New Password <span className="text-primary-red">*</span>
              </label>
              <input type="password" name="newPassword" placeholder="New Password" className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm" />
            </div>
            <div className="space-y-3 w-full">
              <label className="font-semibold">
                Confirm Password <span className="text-primary-red">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="h-[54px] w-full border border-[#eee] rounded-xl px-4 text-sm"
              />
            </div>
            <button type="submit" className="bg-primary-green text-white w-full py-4 rounded-xl">
              Reset password
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Page;
