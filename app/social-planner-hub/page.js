'use client';
import Footer from '@/components/footer/Footer';
import Faqs from '@/components/home/faq/Faqs';
import Navbar from '@/components/navbar/Navbar';
import Banner from '@/components/socialPlannerHub/banner/Banner';
import Partnership from '@/components/socialPlannerHub/partnership/Partnership';
import PlannerSolution from '@/components/socialPlannerHub/plannerSolution/PlannerSolution';
import Schedule from '@/components/socialPlannerHub/schedule/Schedule';
import SocialInteraction from '@/components/socialPlannerHub/socialInteraction/SocialInteraction';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Page() {
  return (
    <React.Fragment>
      <div className="clrNav">
      <Navbar logoUrl="/images/growhite.svg" logoAlt="Custom Logo" />
      <Banner />
       <PlannerSolution />
       <Partnership />
       <SocialInteraction />
       <Schedule />
       <Faqs />
       <Footer />
      </div>
    </React.Fragment>
  );
}

export default Page;
