"use client";

import Image from "next/image";
import { useState } from "react";
import EmailForm from "./components/EmailForm";
import OtpVerification from "./components/OtpVerification";
import PasswordUpdate from "./components/PasswordUpdate";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleEmailSubmitted = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep(2);
  };

  const handleOtpVerified = (submittedOtp: string) => {
    setOtp(submittedOtp);
    setStep(3);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-2xl h-fit  p-14 bg-[#F7FAFC] rounded-[30px]">
        <div className="w-full h-full max-w-[460px] mx-auto flex flex-col justify-between items-center space-y-10">
          <Image
            src="/logo/growstack.png"
            alt="growstack"
            height={180}
            width={180}
            className="max-h-14"
          />
          <Image
            src="/assets/forgot-login-password.svg"
            alt=""
            height={400}
            width={400}
            className="max-h-[300px]"
          />
          <div className="w-full">
            {step === 1 && (
              <EmailForm onEmailSubmitted={handleEmailSubmitted} />
            )}
            {step === 2 && (
              <OtpVerification
                email={email}
                onOtpVerified={handleOtpVerified}
                setStep={setStep}
              />
            )}
            {step === 3 && (
              <PasswordUpdate email={email} otp={otp} setStep={setStep} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
