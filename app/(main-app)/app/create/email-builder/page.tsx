"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (endTime: number): TimeLeft => {
  const difference = endTime - new Date().getTime();
  let timeLeft: TimeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const endTimeRef = useRef<number>(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft(endTimeRef.current));
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 h-full w-full flex flex-col items-center justify-center text-center">
      <Image src="/logo/growstack-mini.png" alt="" width={60} height={60} className="mb-10" />
      <div className="text-6xl font-medium mb-12">
        {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
          <div>Time's up!</div>
        ) : (
          <div className="flex space-x-10 bg-white py-6 px-10 shadow-xl shadow-gray-100 rounded-3xl">
            <div>
              <span>{timeLeft.days}</span>
              <span className="block text-sm">days</span>
            </div>
            <div>
              <span>{timeLeft.hours}</span>
              <span className="block text-sm">hours</span>
            </div>
            <div>
              <span>{timeLeft.minutes}</span>
              <span className="block text-sm">minutes</span>
            </div>
            <div>
              <span>{timeLeft.seconds}</span>
              <span className="block text-sm">seconds</span>
            </div>
          </div>
        )}
      </div>
      <h1 className="text-3xl uppercase font-semibold mb-4">Coming Soon</h1>
      <p className="mb-10 max-w-2xl leading-loose">
        We’re currently working on creating something fantastic. We’ll be here soon. Subscribe to the newsletter to be notified.
      </p>
      <form className="w-full max-w-md">
        <div className="flex items-center border-b-2 border-primary-green py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="email"
            placeholder="Your Email"
            aria-label="Email"
          />
          <button
            className="flex-shrink-0 bg-primary-green hover:bg-primary-green border-primary-green hover:border-primary-green text-sm border-4 text-white py-1.5 px-2.5 rounded-lg"
            type="button">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
}
