"use client";
import AllStories from "@/components/allStories/AllStories";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// I commented this bootstrapp CDN because of conflicting styles with tailwindcss, NB: I'll uncomment it as soon as reliable solution is found

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
