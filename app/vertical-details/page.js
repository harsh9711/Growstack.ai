'use client';
import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import VerticalDetails from '@/components/verticals/vertical-details/VerticalDetails';
import React from 'react';

function Page() {
  return (
    <React.Fragment>
       <Navbar />
       <VerticalDetails/>
       <Footer />
    </React.Fragment>
  );
}

export default Page;
