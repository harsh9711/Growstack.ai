"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Verticals from "@/components/verticals/Verticals";
import React from "react";

function Page() {
    return (
        <React.Fragment>
            <Navbar />
            <Verticals />
            <Footer />
        </React.Fragment>
    );
}

export default Page;
