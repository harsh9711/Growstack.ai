"use client";

import React from "react";
import Image from "next/image";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Collapse } from "react-collapse";
import Link from "next/link";
import { BsPlayFill } from "react-icons/bs";

export default function FaqsPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentItem, setCurrentItem] = useState(0);
  return (
    <div className="max-w-[1480px] mx-auto mt-20">
      <section className="py-10">
        <div className="flex flex-col items-start gap-7">
          <h1 className="text-[42px] bg-gradient-to-r from-black to-black/20 bg-clip-text text-transparent">Frequently asked questions</h1>
        </div>
        <div className="w-full flex gap-10 mt-20">
          <Image src="/assets/faq-banner.png" alt="" width={500} height={500} className="w-full max-w-fit object-cover rounded-3xl shadow-box-sm" />
          <div className="space-y-8 w-full max-w-[1140px] mx-auto">
            {faqList.map((faq, index) => (
              <div
                key={index}
                className={`bg-white w-full rounded-[16px] sm:rounded-[20px] px-5 sm:px-6 md:px-10 py-4 md:py-6 ring-1 ring-[#E7E7E7] transition-all duration-500 ${
                  isOpen && currentItem === index && "custom-shadow ring-0"
                }`}>
                <div
                  onClick={() => {
                    if (currentItem === index) {
                      return setIsOpen((prev) => !prev);
                    }
                    setIsOpen(true);
                    setCurrentItem(index);
                  }}
                  className={`w-full cursor-pointer flex gap-20 items-center justify-between  ${isOpen && currentItem === index && "!ring-0"}`}>
                  <h1 className="font-semibold text-lg sm:text-xl cursor-pointer leading-relaxed sm:leading-loose flex gap-x-2 sm:gap-x-3">{faq.question}</h1>
                  <div
                    className={`p-3 rounded-full bg-white shadow-xl shadow-primary-light-gray transition-all duration-500 ${
                      isOpen && currentItem === index && "!bg-primary-green shadow-none"
                    }`}>
                    <ChevronDown
                      size={30}
                      className={clsx(
                        "-rotate-90 translate-y-0.5 transition-all duration-500 text-primary-green",
                        isOpen && currentItem === index && "!rotate-0 text-white"
                      )}
                    />
                  </div>
                </div>
                <Collapse isOpened={isOpen && currentItem === index}>
                  <div className="max-w-5xl leading-loose">{faq.answer}</div>
                </Collapse>
              </div>
            ))}
          </div>{" "}
        </div>
        <div className="bg-primary-green px-14 py-8 rounded-3xl mt-20 flex items-center justify-between">
          <div className="space-y-10">
            <h1 className="font-semibold text-white text-[34px]">
              Lorem Ipsum <span className="font-light">amet consectetur.</span>
            </h1>
            <Link href="" className="flex items-center text-white gap-2 underline">
              <BsPlayFill size={24}/>
              Watch Video
            </Link>
          </div>
          <div className="w-fit h-full overflow-hidden rounded-3xl">
            <Image src="/assets/faq-video.png" alt="" width={300} height={300} className="hover:scale-110 transition duration-300 cursor-pointer" />
          </div>
        </div>
      </section>
    </div>
  );
}

const faqList = [
  {
    question: "How can your platform transform my business strategies into success stories?",
    answer:
      "Simply sign up for an account on our website and explore our features to get started. You can also reach out to our customer support team for assistance.",
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer:
      "Simply sign up for an account on our website and explore our features to get started. You can also reach out to our customer support team for assistance.",
  },
  {
    question: "How does your platform address unique business challenges with tailored solutions?",
    answer:
      "Simply sign up for an account on our website and explore our features to get started. You can also reach out to our customer support team for assistance.",
  },
  {
    question: "What remarkable benefits does your platform offer for businesses seeking growth and prosperity?",
    answer:
      "Simply sign up for an account on our website and explore our features to get started. You can also reach out to our customer support team for assistance.",
  },
];
