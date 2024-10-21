"use client";
import AllStories from "@/components/allStories/AllStories";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

function Page() {
  return (
    <React.Fragment>
      <Navbar />
      <AllStories />
      <Footer />
    </React.Fragment>
  );
}

export default Page;
