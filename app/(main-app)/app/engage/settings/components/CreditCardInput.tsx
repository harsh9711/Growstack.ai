"use client"

import { MasterCardIcon } from "@/components/svgs";
import { useState } from "react";

const CreditCardInput = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const handleCardNumberChange = (e: any) => {
    // Remove non-digit characters from input
    const input = e.target.value.replace(/\D/g, "");

    // Format card number (add spaces every 4 characters)
    const formattedInput = input.replace(/(.{4})/g, "$1 ").trim();

    // Update state
    setCardNumber(formattedInput);
  };

  const handleExpiryChange = (e: any) => {
    // Remove non-digit characters from input
    const input = e.target.value.replace(/\D/g, "");

    // Format expiry (add slash after 2 characters)
    const formattedInput = input
      .replace(/(.{2})/, "$1/")
      .trim()
      .slice(0, 5);

    // Update state
    setExpiry(formattedInput);
  };

  const handleCvcChange = (e: any) => {
    // Remove non-digit characters from input
    const input = e.target.value.replace(/\D/g, "");

    // Update state
    setCvc(input);
  };

  return (
    <div className="flex items-center gap-3 w-full rounded-xl bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
      <MasterCardIcon className="min-w-fit" /> 
      <input
        type="text"
        placeholder="Card number"
        value={cardNumber}
        maxLength={24}
        onChange={handleCardNumberChange}
        className="h-12 bg-transparent w-full focus:outline-none"
      />
      <div className="flex items-center">
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={handleExpiryChange}
          maxLength={5}
          className="h-12 w-20 bg-transparent focus:outline-none"
        />
        <input type="text" placeholder="CVC" value={cvc} onChange={handleCvcChange} maxLength={3} className="h-12 w-20 bg-transparent focus:outline-none" />
      </div>
    </div>
  );
};

export default CreditCardInput;
