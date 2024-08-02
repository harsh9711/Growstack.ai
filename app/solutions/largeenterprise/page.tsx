"use client";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Navigation, Video } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import { motion } from "framer-motion";
import CustomSlider from "./components/Slider";

const testimonials = [
  {
    id: 0,
    img1: "/carousel/c1.png",
    name: "Jimmy Bartney",
    role: "Product Manager at Picko Lab",
    description:
      "I've tried several website builders, but Webbuddy takes the cake. The templates are modern and customizable, and the drag-and-drop interface makes it a breeze to create a stunning website. Love it!",
    companyImage: "It's just incredible!",
  },
  {
    id: 1,
    img1: "/carousel/c1.png",
    name: "Natasha Romanoff",
    role: "Black Widow",
    description:
      "Never thought that with Spend.In managing my business expenses is so easy! Been using this platform for 3 months and still counting!",
    companyImage: "Satisfied User Here!",
  },
  {
    id: 2,
    img1: "/carousel/c1.png",
    name: "Moritika Kazuki",
    role: "Finance Manager at Mangan",
    description:
      "“The best”! That’s what I want to say to this platform, didn’t know that there’s a platform to help you manage your business expenses like this! Very recommended to you who have a big business!",
    companyImage: "No doubt, Spend.In is the best!",
  },
  {
    id: 3,
    img1: "/carousel/c1.png",
    name: "Moritika Kazuki",
    role: "Finance Manager at Mangan",
    description:
      "“The best”! That’s what I want to say to this platform, didn’t know that there’s a platform to help you manage your business expenses like this! Very recommended to you who have a big business!",
    companyImage: "No doubt, Spend.In is the best!",
  },
  {
    id: 4,
    img1: "/carousel/c1.png",
    name: "Moritika Kazuki",
    role: "Finance Manager at Mangan",
    description:
      "“The best”! That’s what I want to say to this platform, didn’t know that there’s a platform to help you manage your business expenses like this! Very recommended to you who have a big business!",
    companyImage: "No doubt, Spend.In is the best!",
  },
  {
    id: 5,
    img1: "/carousel/c1.png",
    name: "Moritika Kazuki",
    role: "Finance Manager at Mangan",
    description:
      "“The best”! That’s what I want to say to this platform, didn’t know that there’s a platform to help you manage your business expenses like this! Very recommended to you who have a big business!",
    companyImage: "No doubt, Spend.In is the best!",
  },
];
const slideData = [
  {title: 'Unify messaging',
  imageSrc: '/sliderimages/slider1.svg',
  subtitle: 'Boost productivity Optimize ROI by 20%',
  tags: ['AI APPS'],
  description: 'Offers a broad suite of over 60 AI-powered applications with multi-modal functionality and advanced features for high-level content creation, lead generation, and sales forecasting.',
  icon: (
    <svg width="54" height="53" viewBox="0 0 54 53" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.165771" width="53" height="53" rx="20" fill="#E6A55B"/>
    <g clip-path="url(#clip0_5288_652)">
    <mask id="path-2-outside-1_5288_652" maskUnits="userSpaceOnUse" x="11" y="10" width="32" height="32" fill="black">
    <rect fill="white" x="11" y="10" width="32" height="32"/>
    <path d="M22.5294 12.7831C22.8702 12.7831 23.1971 12.9183 23.438 13.1591C23.679 13.3998 23.8144 13.7264 23.8144 14.0669V21.5201C23.8156 21.689 23.7832 21.8565 23.719 22.0127C23.6548 22.169 23.5602 22.311 23.4407 22.4305C23.3211 22.5499 23.179 22.6445 23.0226 22.7086C22.8661 22.7727 22.6985 22.805 22.5294 22.8039H15.1053C14.9336 22.8086 14.7626 22.7789 14.6026 22.7166C14.4426 22.6542 14.2967 22.5604 14.1735 22.4407C14.0504 22.321 13.9526 22.1779 13.8858 22.0197C13.819 21.8616 13.7846 21.6917 13.7847 21.5201V14.1025C13.781 13.9283 13.8127 13.755 13.8777 13.5933C13.9428 13.4316 14.04 13.2847 14.1633 13.1614C14.2867 13.0381 14.4337 12.9411 14.5956 12.8761C14.7575 12.8111 14.9309 12.7794 15.1053 12.7831H22.5294ZM22.5294 11H15.1053C14.2817 11 13.4919 11.3269 12.9095 11.9087C12.3272 12.4905 12 13.2797 12 14.1025L12 21.5201C12 22.3437 12.3269 23.1338 12.909 23.717C13.4911 24.3003 14.2809 24.6291 15.1053 24.6315H22.5294C23.3547 24.6291 24.1454 24.3006 24.7289 23.7176C25.3124 23.1346 25.6413 22.3445 25.6437 21.5201V14.1025C25.6413 13.2789 25.3122 12.4897 24.7284 11.9082C24.1446 11.3266 23.3538 11 22.5294 11ZM38.8858 12.7831C39.2266 12.7831 39.5534 12.9183 39.7944 13.1591C40.0354 13.3998 40.1707 13.7264 40.1707 14.0669V21.5201C40.1719 21.689 40.1395 21.8565 40.0753 22.0127C40.0112 22.169 39.9166 22.311 39.797 22.4305C39.6775 22.5499 39.5353 22.6445 39.3789 22.7086C39.2225 22.7727 39.0549 22.805 38.8858 22.8039H31.4616C31.1208 22.8039 30.794 22.6686 30.553 22.4278C30.3121 22.1871 30.1767 21.8605 30.1767 21.5201V14.1025C30.1731 13.9313 30.2037 13.761 30.2666 13.6017C30.3294 13.4423 30.4234 13.297 30.5429 13.1743C30.6625 13.0515 30.8053 12.9537 30.963 12.8865C31.1207 12.8194 31.2902 12.7842 31.4616 12.7831H38.8858ZM38.8858 11H31.4616C30.6381 11 29.8482 11.3269 29.2659 11.9087C28.6835 12.4905 28.3563 13.2797 28.3563 14.1025V21.5201C28.3563 22.3437 28.6832 23.1338 29.2653 23.717C29.8474 24.3003 30.6372 24.6291 31.4616 24.6315H38.8858C39.711 24.6291 40.5017 24.3006 41.0853 23.7176C41.6688 23.1346 41.9976 22.3445 42 21.5201V14.1025C41.9976 13.2789 41.6685 12.4897 41.0847 11.9082C40.5009 11.3266 39.7102 11 38.8858 11ZM38.8858 29.1872C39.0545 29.1872 39.2216 29.2204 39.3775 29.2849C39.5334 29.3495 39.6751 29.444 39.7944 29.5632C39.9137 29.6824 40.0083 29.824 40.0729 29.9797C40.1375 30.1355 40.1707 30.3024 40.1707 30.471V37.8886C40.1719 38.0575 40.1395 38.225 40.0753 38.3812C40.0112 38.5375 39.9166 38.6795 39.797 38.799C39.6775 38.9184 39.5353 39.013 39.3789 39.0771C39.2225 39.1411 39.0549 39.1735 38.8858 39.1724H31.4616C31.1208 39.1724 30.794 39.0371 30.553 38.7963C30.3121 38.5556 30.1767 38.229 30.1767 37.8886V30.471C30.179 30.1313 30.3151 29.8061 30.5556 29.5658C30.7961 29.3256 31.1216 29.1896 31.4616 29.1872H38.8858ZM38.8858 27.4042H31.4616C30.6381 27.4042 29.8482 27.731 29.2659 28.3129C28.6835 28.8947 28.3563 29.6838 28.3563 30.5067V37.9242C28.3563 38.7479 28.6832 39.5379 29.2653 40.1212C29.8474 40.7044 30.6372 41.0333 31.4616 41.0357H38.8858C39.711 41.0333 40.5017 40.7047 41.0853 40.1217C41.6688 39.5387 41.9976 38.7487 42 37.9242V30.471C41.9976 29.6474 41.6685 28.8582 41.0847 28.2767C40.5009 27.6951 39.7102 27.3685 38.8858 27.3685V27.4042ZM22.5294 29.1872C22.6982 29.1872 22.8653 29.2204 23.0212 29.2849C23.1771 29.3495 23.3187 29.444 23.438 29.5632C23.5574 29.6824 23.652 29.824 23.7166 29.9797C23.7812 30.1355 23.8144 30.3024 23.8144 30.471V37.8886C23.8156 38.0575 23.7832 38.225 23.719 38.3812C23.6548 38.5375 23.5602 38.6795 23.4407 38.799C23.3211 38.9184 23.179 39.013 23.0226 39.0771C22.8661 39.1411 22.6985 39.1735 22.5294 39.1724H15.1053C14.9336 39.1771 14.7626 39.1474 14.6026 39.0851C14.4426 39.0227 14.2967 38.9289 14.1735 38.8092C14.0504 38.6895 13.9526 38.5464 13.8858 38.3882C13.819 38.2301 13.7846 38.0602 13.7847 37.8886V30.471C13.7858 30.2997 13.821 30.1304 13.8882 29.9728C13.9554 29.8152 14.0533 29.6726 14.1762 29.5531C14.2991 29.4337 14.4445 29.3398 14.604 29.277C14.7635 29.2142 14.9339 29.1837 15.1053 29.1872H22.5294ZM22.5294 27.4042H15.1053C14.2879 27.4041 13.5034 27.7261 12.922 28.3002C12.3407 28.8744 12.0094 29.6544 12 30.471L12 37.8886C12 38.7122 12.3269 39.5023 12.909 40.0855C13.4911 40.6688 14.2809 40.9976 15.1053 41H22.5294C23.3547 40.9976 24.1454 40.6691 24.7289 40.0861C25.3124 39.5031 25.6413 38.713 25.6437 37.8886V30.471C25.6413 29.6474 25.3122 28.8582 24.7284 28.2767C24.1446 27.6951 23.3538 27.3685 22.5294 27.3685V27.4042Z"/>
    </mask>
    <path d="M22.5294 12.7831C22.8702 12.7831 23.1971 12.9183 23.438 13.1591C23.679 13.3998 23.8144 13.7264 23.8144 14.0669V21.5201C23.8156 21.689 23.7832 21.8565 23.719 22.0127C23.6548 22.169 23.5602 22.311 23.4407 22.4305C23.3211 22.5499 23.179 22.6445 23.0226 22.7086C22.8661 22.7727 22.6985 22.805 22.5294 22.8039H15.1053C14.9336 22.8086 14.7626 22.7789 14.6026 22.7166C14.4426 22.6542 14.2967 22.5604 14.1735 22.4407C14.0504 22.321 13.9526 22.1779 13.8858 22.0197C13.819 21.8616 13.7846 21.6917 13.7847 21.5201V14.1025C13.781 13.9283 13.8127 13.755 13.8777 13.5933C13.9428 13.4316 14.04 13.2847 14.1633 13.1614C14.2867 13.0381 14.4337 12.9411 14.5956 12.8761C14.7575 12.8111 14.9309 12.7794 15.1053 12.7831H22.5294ZM22.5294 11H15.1053C14.2817 11 13.4919 11.3269 12.9095 11.9087C12.3272 12.4905 12 13.2797 12 14.1025L12 21.5201C12 22.3437 12.3269 23.1338 12.909 23.717C13.4911 24.3003 14.2809 24.6291 15.1053 24.6315H22.5294C23.3547 24.6291 24.1454 24.3006 24.7289 23.7176C25.3124 23.1346 25.6413 22.3445 25.6437 21.5201V14.1025C25.6413 13.2789 25.3122 12.4897 24.7284 11.9082C24.1446 11.3266 23.3538 11 22.5294 11ZM38.8858 12.7831C39.2266 12.7831 39.5534 12.9183 39.7944 13.1591C40.0354 13.3998 40.1707 13.7264 40.1707 14.0669V21.5201C40.1719 21.689 40.1395 21.8565 40.0753 22.0127C40.0112 22.169 39.9166 22.311 39.797 22.4305C39.6775 22.5499 39.5353 22.6445 39.3789 22.7086C39.2225 22.7727 39.0549 22.805 38.8858 22.8039H31.4616C31.1208 22.8039 30.794 22.6686 30.553 22.4278C30.3121 22.1871 30.1767 21.8605 30.1767 21.5201V14.1025C30.1731 13.9313 30.2037 13.761 30.2666 13.6017C30.3294 13.4423 30.4234 13.297 30.5429 13.1743C30.6625 13.0515 30.8053 12.9537 30.963 12.8865C31.1207 12.8194 31.2902 12.7842 31.4616 12.7831H38.8858ZM38.8858 11H31.4616C30.6381 11 29.8482 11.3269 29.2659 11.9087C28.6835 12.4905 28.3563 13.2797 28.3563 14.1025V21.5201C28.3563 22.3437 28.6832 23.1338 29.2653 23.717C29.8474 24.3003 30.6372 24.6291 31.4616 24.6315H38.8858C39.711 24.6291 40.5017 24.3006 41.0853 23.7176C41.6688 23.1346 41.9976 22.3445 42 21.5201V14.1025C41.9976 13.2789 41.6685 12.4897 41.0847 11.9082C40.5009 11.3266 39.7102 11 38.8858 11ZM38.8858 29.1872C39.0545 29.1872 39.2216 29.2204 39.3775 29.2849C39.5334 29.3495 39.6751 29.444 39.7944 29.5632C39.9137 29.6824 40.0083 29.824 40.0729 29.9797C40.1375 30.1355 40.1707 30.3024 40.1707 30.471V37.8886C40.1719 38.0575 40.1395 38.225 40.0753 38.3812C40.0112 38.5375 39.9166 38.6795 39.797 38.799C39.6775 38.9184 39.5353 39.013 39.3789 39.0771C39.2225 39.1411 39.0549 39.1735 38.8858 39.1724H31.4616C31.1208 39.1724 30.794 39.0371 30.553 38.7963C30.3121 38.5556 30.1767 38.229 30.1767 37.8886V30.471C30.179 30.1313 30.3151 29.8061 30.5556 29.5658C30.7961 29.3256 31.1216 29.1896 31.4616 29.1872H38.8858ZM38.8858 27.4042H31.4616C30.6381 27.4042 29.8482 27.731 29.2659 28.3129C28.6835 28.8947 28.3563 29.6838 28.3563 30.5067V37.9242C28.3563 38.7479 28.6832 39.5379 29.2653 40.1212C29.8474 40.7044 30.6372 41.0333 31.4616 41.0357H38.8858C39.711 41.0333 40.5017 40.7047 41.0853 40.1217C41.6688 39.5387 41.9976 38.7487 42 37.9242V30.471C41.9976 29.6474 41.6685 28.8582 41.0847 28.2767C40.5009 27.6951 39.7102 27.3685 38.8858 27.3685V27.4042ZM22.5294 29.1872C22.6982 29.1872 22.8653 29.2204 23.0212 29.2849C23.1771 29.3495 23.3187 29.444 23.438 29.5632C23.5574 29.6824 23.652 29.824 23.7166 29.9797C23.7812 30.1355 23.8144 30.3024 23.8144 30.471V37.8886C23.8156 38.0575 23.7832 38.225 23.719 38.3812C23.6548 38.5375 23.5602 38.6795 23.4407 38.799C23.3211 38.9184 23.179 39.013 23.0226 39.0771C22.8661 39.1411 22.6985 39.1735 22.5294 39.1724H15.1053C14.9336 39.1771 14.7626 39.1474 14.6026 39.0851C14.4426 39.0227 14.2967 38.9289 14.1735 38.8092C14.0504 38.6895 13.9526 38.5464 13.8858 38.3882C13.819 38.2301 13.7846 38.0602 13.7847 37.8886V30.471C13.7858 30.2997 13.821 30.1304 13.8882 29.9728C13.9554 29.8152 14.0533 29.6726 14.1762 29.5531C14.2991 29.4337 14.4445 29.3398 14.604 29.277C14.7635 29.2142 14.9339 29.1837 15.1053 29.1872H22.5294ZM22.5294 27.4042H15.1053C14.2879 27.4041 13.5034 27.7261 12.922 28.3002C12.3407 28.8744 12.0094 29.6544 12 30.471L12 37.8886C12 38.7122 12.3269 39.5023 12.909 40.0855C13.4911 40.6688 14.2809 40.9976 15.1053 41H22.5294C23.3547 40.9976 24.1454 40.6691 24.7289 40.0861C25.3124 39.5031 25.6413 38.713 25.6437 37.8886V30.471C25.6413 29.6474 25.3122 28.8582 24.7284 28.2767C24.1446 27.6951 23.3538 27.3685 22.5294 27.3685V27.4042Z" fill="white"/>
    <path d="M22.5294 12.7831C22.8702 12.7831 23.1971 12.9183 23.438 13.1591C23.679 13.3998 23.8144 13.7264 23.8144 14.0669V21.5201C23.8156 21.689 23.7832 21.8565 23.719 22.0127C23.6548 22.169 23.5602 22.311 23.4407 22.4305C23.3211 22.5499 23.179 22.6445 23.0226 22.7086C22.8661 22.7727 22.6985 22.805 22.5294 22.8039H15.1053C14.9336 22.8086 14.7626 22.7789 14.6026 22.7166C14.4426 22.6542 14.2967 22.5604 14.1735 22.4407C14.0504 22.321 13.9526 22.1779 13.8858 22.0197C13.819 21.8616 13.7846 21.6917 13.7847 21.5201V14.1025C13.781 13.9283 13.8127 13.755 13.8777 13.5933C13.9428 13.4316 14.04 13.2847 14.1633 13.1614C14.2867 13.0381 14.4337 12.9411 14.5956 12.8761C14.7575 12.8111 14.9309 12.7794 15.1053 12.7831H22.5294ZM22.5294 11H15.1053C14.2817 11 13.4919 11.3269 12.9095 11.9087C12.3272 12.4905 12 13.2797 12 14.1025L12 21.5201C12 22.3437 12.3269 23.1338 12.909 23.717C13.4911 24.3003 14.2809 24.6291 15.1053 24.6315H22.5294C23.3547 24.6291 24.1454 24.3006 24.7289 23.7176C25.3124 23.1346 25.6413 22.3445 25.6437 21.5201V14.1025C25.6413 13.2789 25.3122 12.4897 24.7284 11.9082C24.1446 11.3266 23.3538 11 22.5294 11ZM38.8858 12.7831C39.2266 12.7831 39.5534 12.9183 39.7944 13.1591C40.0354 13.3998 40.1707 13.7264 40.1707 14.0669V21.5201C40.1719 21.689 40.1395 21.8565 40.0753 22.0127C40.0112 22.169 39.9166 22.311 39.797 22.4305C39.6775 22.5499 39.5353 22.6445 39.3789 22.7086C39.2225 22.7727 39.0549 22.805 38.8858 22.8039H31.4616C31.1208 22.8039 30.794 22.6686 30.553 22.4278C30.3121 22.1871 30.1767 21.8605 30.1767 21.5201V14.1025C30.1731 13.9313 30.2037 13.761 30.2666 13.6017C30.3294 13.4423 30.4234 13.297 30.5429 13.1743C30.6625 13.0515 30.8053 12.9537 30.963 12.8865C31.1207 12.8194 31.2902 12.7842 31.4616 12.7831H38.8858ZM38.8858 11H31.4616C30.6381 11 29.8482 11.3269 29.2659 11.9087C28.6835 12.4905 28.3563 13.2797 28.3563 14.1025V21.5201C28.3563 22.3437 28.6832 23.1338 29.2653 23.717C29.8474 24.3003 30.6372 24.6291 31.4616 24.6315H38.8858C39.711 24.6291 40.5017 24.3006 41.0853 23.7176C41.6688 23.1346 41.9976 22.3445 42 21.5201V14.1025C41.9976 13.2789 41.6685 12.4897 41.0847 11.9082C40.5009 11.3266 39.7102 11 38.8858 11ZM38.8858 29.1872C39.0545 29.1872 39.2216 29.2204 39.3775 29.2849C39.5334 29.3495 39.6751 29.444 39.7944 29.5632C39.9137 29.6824 40.0083 29.824 40.0729 29.9797C40.1375 30.1355 40.1707 30.3024 40.1707 30.471V37.8886C40.1719 38.0575 40.1395 38.225 40.0753 38.3812C40.0112 38.5375 39.9166 38.6795 39.797 38.799C39.6775 38.9184 39.5353 39.013 39.3789 39.0771C39.2225 39.1411 39.0549 39.1735 38.8858 39.1724H31.4616C31.1208 39.1724 30.794 39.0371 30.553 38.7963C30.3121 38.5556 30.1767 38.229 30.1767 37.8886V30.471C30.179 30.1313 30.3151 29.8061 30.5556 29.5658C30.7961 29.3256 31.1216 29.1896 31.4616 29.1872H38.8858ZM38.8858 27.4042H31.4616C30.6381 27.4042 29.8482 27.731 29.2659 28.3129C28.6835 28.8947 28.3563 29.6838 28.3563 30.5067V37.9242C28.3563 38.7479 28.6832 39.5379 29.2653 40.1212C29.8474 40.7044 30.6372 41.0333 31.4616 41.0357H38.8858C39.711 41.0333 40.5017 40.7047 41.0853 40.1217C41.6688 39.5387 41.9976 38.7487 42 37.9242V30.471C41.9976 29.6474 41.6685 28.8582 41.0847 28.2767C40.5009 27.6951 39.7102 27.3685 38.8858 27.3685V27.4042ZM22.5294 29.1872C22.6982 29.1872 22.8653 29.2204 23.0212 29.2849C23.1771 29.3495 23.3187 29.444 23.438 29.5632C23.5574 29.6824 23.652 29.824 23.7166 29.9797C23.7812 30.1355 23.8144 30.3024 23.8144 30.471V37.8886C23.8156 38.0575 23.7832 38.225 23.719 38.3812C23.6548 38.5375 23.5602 38.6795 23.4407 38.799C23.3211 38.9184 23.179 39.013 23.0226 39.0771C22.8661 39.1411 22.6985 39.1735 22.5294 39.1724H15.1053C14.9336 39.1771 14.7626 39.1474 14.6026 39.0851C14.4426 39.0227 14.2967 38.9289 14.1735 38.8092C14.0504 38.6895 13.9526 38.5464 13.8858 38.3882C13.819 38.2301 13.7846 38.0602 13.7847 37.8886V30.471C13.7858 30.2997 13.821 30.1304 13.8882 29.9728C13.9554 29.8152 14.0533 29.6726 14.1762 29.5531C14.2991 29.4337 14.4445 29.3398 14.604 29.277C14.7635 29.2142 14.9339 29.1837 15.1053 29.1872H22.5294ZM22.5294 27.4042H15.1053C14.2879 27.4041 13.5034 27.7261 12.922 28.3002C12.3407 28.8744 12.0094 29.6544 12 30.471L12 37.8886C12 38.7122 12.3269 39.5023 12.909 40.0855C13.4911 40.6688 14.2809 40.9976 15.1053 41H22.5294C23.3547 40.9976 24.1454 40.6691 24.7289 40.0861C25.3124 39.5031 25.6413 38.713 25.6437 37.8886V30.471C25.6413 29.6474 25.3122 28.8582 24.7284 28.2767C24.1446 27.6951 23.3538 27.3685 22.5294 27.3685V27.4042Z" stroke="white" stroke-width="0.6" mask="url(#path-2-outside-1_5288_652)"/>
    </g>
    <defs>
    <clipPath id="clip0_5288_652">
    <rect width="30" height="30" fill="white" transform="translate(12 11)"/>
    </clipPath>
    </defs>
    </svg>
    
  )
},
  {
    title: 'Standardize communications',
    imageSrc: '/sliderimages/slider2.svg',
    subtitle: 'Reduce decision-making time by 40% increase efficiency',
    tags: ['AI CHAT'],
    description: 'Offers advanced market research capabilities and industry insights through top LLMs for in-depth, multi- region market analysis, competitive intelligence, and strategic global decision- making.',
    icon: (
      <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="53" height="53" rx="20" fill="#5ABA87"/>
      <path d="M25.9999 10.9077C24.6744 10.9077 23.5999 11.9822 23.5999 13.3077C23.5999 14.177 24.0621 14.9382 24.7538 15.3592V15.5231H17.923C15.323 15.5231 13.2153 17.6308 13.2153 20.2308V31.7692C13.2153 34.3383 15.2733 36.4269 17.8307 36.476V39.8462C17.8307 40.5344 18.3886 41.0923 19.0768 41.0923C19.7651 41.0923 20.323 40.5344 20.323 39.8462V36.4769H31.6768V39.8462C31.6768 40.5344 32.2348 41.0923 32.923 41.0923C33.6112 41.0923 34.1692 40.5344 34.1692 39.8462V36.476C36.7265 36.4269 38.7845 34.3383 38.7845 31.7692V20.2308C38.7845 17.6308 36.6768 15.5231 34.0768 15.5231H27.2461V15.3592C27.9377 14.9382 28.3999 14.177 28.3999 13.3077C28.3999 11.9822 27.3254 10.9077 25.9999 10.9077ZM34.0768 34.3692H32.923H19.0768H17.923C17.3153 34.3692 16.5741 34.0285 15.9816 33.5231C15.3877 33.0166 14.9686 32.3669 14.9686 31.7692V20.2308C14.9686 19.63 15.391 18.8954 15.9867 18.3043C16.5823 17.7132 17.3217 17.2949 17.923 17.2949H34.0768C34.6786 17.2949 35.4307 17.7137 36.0389 18.3049C36.6475 18.8965 37.0815 19.6309 37.0815 20.2308V31.7692C37.0815 32.3659 36.651 33.0155 36.0441 33.5225C35.4388 34.0282 34.6849 34.3692 34.0768 34.3692ZM31.8615 21.3846C31.8615 20.6964 31.3036 20.1385 30.6153 20.1385C29.9271 20.1385 29.3692 20.6964 29.3692 21.3846V23.6923C29.3692 24.3806 29.9271 24.9385 30.6153 24.9385C31.3036 24.9385 31.8615 24.3806 31.8615 23.6923V21.3846ZM22.6307 21.3846C22.6307 20.6964 22.0728 20.1385 21.3845 20.1385C20.6963 20.1385 20.1384 20.6964 20.1384 21.3846V23.6923C20.1384 24.3806 20.6963 24.9385 21.3845 24.9385C22.0728 24.9385 22.6307 24.3806 22.6307 23.6923V21.3846ZM22.6307 28.3077C22.6307 27.6194 22.0728 27.0615 21.3845 27.0615C20.6963 27.0615 20.1384 27.6194 20.1384 28.3077V29.4615C20.1384 30.7871 21.2129 31.8615 22.5384 31.8615H29.4615C30.787 31.8615 31.8615 30.7871 31.8615 29.4615V28.3077C31.8615 27.6194 31.3036 27.0615 30.6153 27.0615C29.9271 27.0615 29.3692 27.6194 29.3692 28.3077V29.3692H22.6307V28.3077Z" fill="white" stroke="white" stroke-width="0.184615"/>
      </svg>
      
      
    )
  },
  {
    title: 'Harmonize campaigns',
    imageSrc: '/sliderimages/slider3.svg',
    subtitle: 'Reduce decision-making time by 40% increase efficiency',
    tags: ['AI assistant'],
    description: 'Customizable AI assistants for automating high-level research, routine tasks, data analysis, and operational efficiency, tailored to support various departments and scalable for enterprise-wide operations.',
    icon: (
      <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="0.287598" width="46.5655" height="46.5655" rx="17.5719" fill="#CC63D4"/>
      <path d="M21.75 13.375C22.0952 13.375 22.375 13.0952 22.375 12.75C22.375 12.4048 22.0952 12.125 21.75 12.125C21.4048 12.125 21.125 12.4048 21.125 12.75C21.125 13.0952 21.4048 13.375 21.75 13.375Z" fill="white"/>
      <path d="M26.4377 18.6875V14.9375C26.4377 14.5923 26.1582 14.3125 25.8127 14.3125C25.4673 14.3125 25.1877 14.5923 25.1877 14.9375V18.6875C25.1877 19.0327 25.4673 19.3125 25.8127 19.3125C26.1582 19.3125 26.4377 19.0327 26.4377 18.6875ZM19.2832 19.2466C19.5926 19.4007 19.9668 19.2759 20.1218 18.967L20.2616 18.6875H22.6139L22.7536 18.967C22.8635 19.1862 23.0838 19.3128 23.3133 19.3125C23.4073 19.3125 23.5025 19.2914 23.5923 19.2466C23.9011 19.0922 24.0262 18.7168 23.8718 18.408L21.9968 14.658C21.7844 14.2344 21.0911 14.2344 20.8787 14.658L19.0037 18.408C18.8492 18.7168 18.9744 19.0922 19.2832 19.2466ZM21.4377 16.3349L21.989 17.4375H20.8865L21.4377 16.3349Z" fill="white"/>
      <path d="M33.625 12.125C33.2813 12.125 33 12.4063 33 12.75V15.875C33 16.2187 32.7187 16.5 32.375 16.5H32.0625C32.0625 15.4687 31.2188 14.625 30.1875 14.625H29.5625C29.5625 13.2437 28.4438 12.125 27.0625 12.125H24.25C23.9063 12.125 23.625 12.4063 23.625 12.75C23.625 13.0937 23.9063 13.375 24.25 13.375H27.0625C27.75 13.375 28.3125 13.9375 28.3125 14.625V19C28.3125 19.6875 27.75 20.25 27.0625 20.25H18.9375C18.25 20.25 17.6875 19.6875 17.6875 19V14.625C17.6875 13.9375 18.25 13.375 18.9375 13.375H19.25C19.5937 13.375 19.875 13.0937 19.875 12.75C19.875 12.4063 19.5937 12.125 19.25 12.125H18.9375C17.5562 12.125 16.4375 13.2437 16.4375 14.625H15.8125C14.7812 14.625 13.9375 15.4687 13.9375 16.5H13.625C13.2813 16.5 13 16.2187 13 15.875V12.75C13 12.4063 12.7187 12.125 12.375 12.125C12.0313 12.125 11.75 12.4063 11.75 12.75V15.875C11.75 16.9062 12.5937 17.75 13.625 17.75H13.9375C13.9375 18.7812 14.7812 19.625 15.8125 19.625H16.525C16.8063 20.7 17.775 21.5 18.9375 21.5H21.125V23.375C17.3312 23.375 14.25 26.4562 14.25 30.25V34C14.25 35.0312 15.0937 35.875 16.125 35.875H29.875C30.9063 35.875 31.75 35.0312 31.75 34V30.25C31.75 26.4562 28.6688 23.375 24.875 23.375V21.5H27.0625C28.225 21.5 29.1937 20.7 29.475 19.625H30.1875C31.2188 19.625 32.0625 18.7812 32.0625 17.75H32.375C33.4063 17.75 34.25 16.9062 34.25 15.875V12.75C34.25 12.4063 33.9687 12.125 33.625 12.125ZM16.4375 18.375H15.8125C15.4688 18.375 15.1875 18.0937 15.1875 17.75V16.5C15.1875 16.1563 15.4688 15.875 15.8125 15.875H16.4375V18.375ZM22.375 21.5H23.625V23.375H22.375V21.5ZM30.5 30.25V34C30.5 34.3437 30.2187 34.625 29.875 34.625H16.125C15.7813 34.625 15.5 34.3437 15.5 34V30.25C15.5 27.15 18.025 24.625 21.125 24.625H24.875C27.975 24.625 30.5 27.15 30.5 30.25ZM30.8125 17.75C30.8125 18.0937 30.5312 18.375 30.1875 18.375H29.5625V15.875H30.1875C30.5312 15.875 30.8125 16.1563 30.8125 16.5V17.75Z" fill="white"/>
      <path d="M28 28.9995H27.375V27.7495C27.375 27.4058 27.0937 27.1245 26.75 27.1245H26.125V26.4995C26.125 26.1558 25.8437 25.8745 25.5 25.8745C25.1563 25.8745 24.875 26.1558 24.875 26.4995V27.1245H23.625V26.4995C23.625 26.1558 23.3437 25.8745 23 25.8745C22.6563 25.8745 22.375 26.1558 22.375 26.4995V27.1245H21.125V26.4995C21.125 26.1558 20.8437 25.8745 20.5 25.8745C20.1563 25.8745 19.875 26.1558 19.875 26.4995V27.1245H19.25C18.9063 27.1245 18.625 27.4058 18.625 27.7495V28.9995H18C17.6563 28.9995 17.375 29.2808 17.375 29.6245C17.375 29.9683 17.6563 30.2495 18 30.2495H18.625V31.4995C18.625 31.8433 18.9063 32.1245 19.25 32.1245H19.875V32.7495C19.875 33.0933 20.1563 33.3745 20.5 33.3745C20.8437 33.3745 21.125 33.0933 21.125 32.7495V32.1245H22.375V32.7495C22.375 33.0933 22.6563 33.3745 23 33.3745C23.3437 33.3745 23.625 33.0933 23.625 32.7495V32.1245H24.875V32.7495C24.875 33.0933 25.1563 33.3745 25.5 33.3745C25.8437 33.3745 26.125 33.0933 26.125 32.7495V32.1245H26.75C27.0937 32.1245 27.375 31.8433 27.375 31.4995V30.2495H28C28.3437 30.2495 28.625 29.9683 28.625 29.6245C28.625 29.2808 28.3437 28.9995 28 28.9995ZM26.125 30.8745H19.875V28.3745H26.125V30.8745Z" fill="white"/>
      </svg>
      
      
    )
  },
];
const Home = () => {
//   const [ref2, inView2] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });
  const images = [
    {
      src: "/imagezoom/zoom1.svg",
      className: "w-[301px] h-[200px] translate-x-[200px]",
      largeSrc: '/zoomedimages/zoom1.svg', 
    },
    {
      src: "/imagezoom/zoom2.svg",
      className: "w-[290.5px] h-[200px] translate-x-[320px] -translate-y-20",
      largeSrc: '/zoomedimages/zoom2.svg', 
    },
    {
      src: "/imagezoom/zoom3.svg",
      className: "w-[301px] h-[200px] translate-x-[350px] translate-y-32",
      largeSrc: '/zoomedimages/zoom3.svg', 
    },
    {
      src: "/imagezoom/zoom4.svg",
      className: "w-[301px] h-[200px] -translate-x-[400px] translate-y-60",
      largeSrc: '/zoomedimages/zoom4.svg', 
    },
    {
      src: "/imagezoom/zoom5.svg",
      className:
        "w-[301px] h-[200px]  -translate-x-[170px] -translate-y-40",
        largeSrc: '/zoomedimages/zoom5.svg', 
    },
  ];
  type ImageType = {
    src: string;
    largeSrc: string;
    className?: string;
  };
  
  interface ImageGalleryProps {
    images: ImageType[];
  }
      const [clickedImage, setClickedImage] = useState<string | null>(null);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  
    const handleClick = (largeSrc: string, index: number) => {
      setClickedImage(largeSrc);
      setClickedIndex(index);
    };
  
    const handleClose = () => {
      setClickedImage(null);
      setClickedIndex(null);
    };
  
    const getRemainingImageStyle = (index: number): React.CSSProperties =>{
    const positions = [
      { bottom: '200px', left: '10px' },
      { bottom: '200px', right: '100px' },
      { top: '300px', left: '300px' },
      { top: '200px', right: '600px' },
    ];

    return positions[index % positions.length];
  };


  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = 5;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  type SliderRef = Slider | null;

  //   const sliderRef = useRef<SliderRef>(null);

  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState<number[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  type SlickBeforeChange = (current: number, next: number) => void;
  const settings2 = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
      afterChange: (index: number) => {
        setActiveIndex(index);
      },
  };
  
  const isSlideVisible = (index: number, activeIndex: number): boolean => {
    if (index === activeIndex + 1) {
      return true;
    } else if (index === 0 && activeIndex === 2) {
      return true;
    }
    
    return false;
  };
  const handleBeforeChange2: SlickBeforeChange = (current, next) => {
    setActiveIndex(next);
  };
  const handleBeforeChange = (oldIndex: number, newIndex: number) => {
    setCurrentSlide(newIndex);
  };
  const previous = () => {
    if (sliderRef.current) {
      (sliderRef.current as Slider).slickPrev();
    }
  };

  const next = () => {
    if (sliderRef.current) {
      (sliderRef.current as Slider).slickNext();
    }
  };
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <main className="bg-white">
      <section className="">
        <div className="relative flex items-center w-full h-full  rounded-[40px]  pt-40 bg-[#F3F7F6] ">
          <div className="w-full h-full mx-auto flex flex-col  justify-between max-h-[870px] max-w-[1920px] items-center">
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <div className=" w-full gap-y-4 flex flex-col items-center justify-center mx-auto">
                <div className="bg-[#0347371A] text-[#034737] py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest  font-semibold uppercase w-full max-w-[303px] ">
                  Growstack for large enterprises
                </div>

                <div className="  items-center flex flex-col gap-y-4 justify-center  mx-auto ">
                  <h1 className="text-[56px]  leading-12 flex flex-col  items-center justify-center bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                    <span className="font-semibold text-center">
                      Streamline complex
                    </span>
                    <span className="font-light text-center">
                      operation's with advance AI solutions
                    </span>
                  </h1>

                  <p className="text-[18px]  items-center justify-center text-center max-w-[819px] leading-loose">
                    Growstack's advanced Al tools and scalable solutions address
                    the unique challenges of large enterprises by ensuring
                    global alignment, consistent marketing and sales, effective
                    personalization, and seamless data integration.{" "}
                  </p>
                  <div className="flex flex-col gap-24 mt-4 items-center justify-center ">
                    <div className="flex flex-row gap-8 ">
                      <button className="bg-[#034737] text-white font-medium flex items-center gap-2 py-4 px-7 rounded-xl hover:font-bold shadow-md shadow-[#00000025]">
                        Free free trial <ArrowRight />
                      </button>
                      <button className="border border-[#D9D9D9] flex items-center gap-2 text-black hover:font-bold font-medium py-4 px-7 rounded-xl shadow-md shadow-[#00000025]">
                        See demo <ArrowRight className="text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative translate-y-16 flex -translate-x-60 ">
              <Image
                src="/solutions/dlk.svg"
                width={1951}
                height={448}
                alt="img"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20 mt-10">
        <div
          className=" w-full max-w-[1920px] h-[602px] gap-y-4 flex flex-col items-center justify-center mx-auto"
          style={{
            backgroundImage: "url(/solutions/background.svg)",
            maxWidth: "2000px",
          }}
        >
          <div className="relative flex flex-col gap-y-4 justify-center items-center mx-auto bg-cover py-20 bg-center bg-no-repeat">
            <h1 className="text-[56px] leading-12 flex flex-col items-center justify-center bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent relative z-10">
              <span className="font-semibold text-center">
                Comprehensive solution for
              </span>
              <span className="font-light text-center">
                enterprise level success
              </span>
            </h1>

            <p className="text-[18px] text-center max-w-[819px] leading-loose relative z-10">
              Discover how GrowStacks advanced AI solutions streamline processes
            </p>
          </div>
        </div>
      </section>
      <section className="px-4">
        <div className="relative flex items-center w-full h-full  rounded-[40px]  py-40 bg-gradient-to-b from-[#E2F0CB] to-[#FFFFFF] ">
          <div className="w-full  mx-auto flex flex-col  justify-between  h-full max-h-[940px] max-w-[1920px] items-center">
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <div className=" w-full gap-y-4 flex flex-col items-center justify-center mx-auto">
                <div className="bg-[#0347371A] text-[#034737] py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest  font-semibold uppercase w-full max-w-[139px] ">
                  Consistency
                </div>

                <div className="  items-center flex flex-col gap-y-4 justify-center  mx-auto ">
                  <h1 className="text-[56px]  leading-12 flex  gap-4  items-center justify-center text-black">
                    <span className="font-semibold text-center">
                      Global alignment
                    </span>
                    <span className="font-light text-center">
                      and consistency
                    </span>
                  </h1>
                </div>
              </div>
            </div>
      
    
              <CustomSlider />
          </div>
        </div>
      </section>
      <section className="">
        <div className="relative flex items-center w-full h-full pb-40 bg-white overflow-hidden">
          <div className="w-full h-full mx-auto flex flex-col justify-between max-h-[950px] max-w-[1920px] items-center">
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <div className="w-full gap-y-4  flex flex-col items-center justify-center mx-auto">
                <div className="bg-[#0347371A] hover:shadow-md text-[#034737] py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[166px]">
                  stay connected
                </div>

                <div className="items-center flex flex-col gap-y-4 justify-center mx-auto">
                  <h1 className="text-[28px] leading-12 flex gap-4 items-center justify-center text-black">
                    <span className="font-semibold text-center">
                      Breaking down data silos
                    </span>
                  </h1>
                  <p className="text-center items-center justify-center w-full max-w-[1026px]">
                    In large enterprises, various teams collaborate to manage
                    operations, develop strategies, and handle day-to-day
                    functions. By using Growstack, you can ensure that your
                    teams stay connected and seamlessly share information,
                    effectively preventing data silos and fostering
                    collaboration across your organization.
                  </p>
                  <button className="bg-[#034737] mt-4 text-white font-medium flex items-center gap-2 py-4 px-7 rounded-xl hover:font-bold shadow-md shadow-[#00000025]">
                    Free trial <ArrowRight />
                  </button>
                </div>
              </div>
              <div
                ref={ref}
                className="mt-20 relative w-full h-[580px] max-w-[1028px] flex items-center justify-center overflow-hidden bg-white brightness-105"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    inView ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 0 }
                  }
                  transition={{ duration: 1.5 }}
                >
                  <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/dashline.mp4" type="video/mp4" />
                    <track
                      src="/path/to/captions.vtt"
                      kind="subtitles"
                      srcLang="en"
                      label="English"
                    />
                  </video>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-green flex flex-col items-center justify-center py-20">
        <div className="w-full gap-y-4 flex flex-col items-center justify-center mx-auto ">
          <div className="bg-white/10 hover:shadow-md text-white py-2 px-4 flex items-center text-center text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[151px]">
            Globalization
          </div>

          <div className="items-center flex flex-col gap-y-4 justify-center mx-auto">
            <h1 className="text-[42px] leading-12 flex gap-4 items-center justify-center text-white">
              <span className="font-semibold text-center">
                Managing complex,
              </span>
              <span className="font-light text-center">global operations</span>
            </h1>
            <p className="text-center text-white/30 tracking-normal items-center justify-center w-full max-w-[1026px]">
              In <span className="text-[#A9FF9B]">large enterprises,</span>{" "}
              various teams collaborate to manage operations, develop
              strategies, and handle day-to-day functions.
            </p>
          </div>
        </div>

        <motion.div
      className="flex gap-4 mt-16 absolute"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: clickedImage ? 0.5 : 1, scale: clickedImage ? 0.8 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          className={`relative z-[40] ${image.className}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: clickedImage && clickedIndex !== index ? 0.5 : 1, scale: clickedImage && clickedIndex !== index ? 0.8 : 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onClick={() => handleClick(image.largeSrc, index)}
          layout
          style={clickedImage && clickedIndex !== index ? getRemainingImageStyle(index) : {}}
        >
          <Image
            src={image.src}
            alt={`Image ${index}`}
            layout="fill"
            objectFit="cover"
            className={`relative ${image.className} ${clickedIndex === index ? 'hidden' : ''}`}
          />
        </motion.div>
      ))}

{clickedImage && (
  <div
    className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
    onClick={handleClose}
  >
    <motion.div
      className="relative z-50"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      onClick={(e) => e.stopPropagation()} 
    >
      <Image
        src={clickedImage}
        alt="Zoomed Image"
        width={1000}
        height={1000}
        className="w-full h-auto"
        objectFit="contain"
      />
    </motion.div>
  </div>
)}

      </motion.div>

      <div
        className={`mx-auto mt-16 items-center justify-center inset-0 transition-opacity duration-500 ${clickedImage ? 'opacity-0' : 'opacity-40'}`}
      >
        <Image
          src="/dashboard.png"
          width={1000}
          height={227}
          alt="Dashboard Image"
          className="rounded-3xl h-[627px]"
        />
      </div>
    
      </section>

      <section className="   ">
        <div className="items-center justify-center flex flex-col gap-y-4 mt-24 overflow-hidden ">
          <Image
            src="/desing.png"
            width={1200}
            height={1000}
            className="w-full absolute  transform scale-y-[-1]  translate-x-10  z-[20] translate-y-80 h-full"
            alt="image"
          />

          <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit">
            {" "}
            Streamline
          </div>
          <h1 className="text-center flex flex-col  text-[42px] leading-normal">
            <span className="relative text-black font-semibold">
              Streamline your entire marketing process
            </span>
            <span className="text-black font-extralight  ">
              {" "}
              from to execution and beyond{" "}
            </span>
          </h1>
        </div>
        <div className="max-w-[1720px] mx-auto mt-10">
          <div className="z-[80] relative">
            <Slider
              ref={sliderRef}
              {...settings}
              beforeChange={handleBeforeChange}
              className=""
            >
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="w-[682px] h-[468px] bg-white rounded-[17px] border border-[#e9e7e7] flex flex-col p-6 mx-4"
                >
                  <div className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col gap-y-4 pb-6">
                      <h1 className="text-[18px] text-black leading-normal font-light multi-line-ellipsis">
                        {item.id}
                      </h1>
                    </div>
                    <div className="space-x-4 mt-10 flex flex-row">
                      <div className="flex flex-col gap-y-2">
                        <h1 className="text-[24px] text-black leading-normal font-medium multi-line-ellipsis">
                          {item.name}
                        </h1>
                        <p className="text-[18px] text-black multi-line-ellipsis">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="mt-16 hidden lg:block">
            <div className="flex w-full max-w-[1720px] justify-between -translate-y-80 z-[90] relative items-center gap-6">
              {currentSlide > 0 && (
                <div className="relative translate-x-10 flex items-center justify-center">
                  <button
                    className="transition z-20 duration-300 cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-[#009a9b]"
                    title="Previous"
                    onClick={previous}
                  >
                    <ArrowLeft size={25} />
                  </button>
                </div>
              )}
              <div className="relative flex items-center justify-center">
                <button
                  className="relative z-20 transition duration-300 cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-[#009a9b]"
                  title="Next"
                  onClick={next}
                >
                  <ArrowRight size={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
