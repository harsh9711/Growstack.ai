'use client';
import Faqs from '@/components/faqs/Faqs';
import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Page() {
  return (
    <React.Fragment>
        <Navbar />
        <Faqs />
        <Footer />
    </React.Fragment>
  );
}

export default Page;
