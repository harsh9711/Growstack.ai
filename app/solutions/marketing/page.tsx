'use client';
import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import Banner from '@/components/solutionMarketing/banner/Banner';
import MarketingExpertise from '@/components/solutionMarketing/marketingExpertise/MarketingExpertise';
import MarketingEfficiency from '@/components/solutionMarketing/marketingEfficiency/MarketingEfficiency';
import MarketingAutomate from '@/components/solutionMarketing/marketingAutomate/MarketingAutomate';
import MarketingInsights from '@/components/solutionMarketing/marketingInsights/MarketingInsights';
import MarketingTechnology from '@/components/solutionMarketing/marketingTechnology/MarketingTechnology';
import MarketingStreamline from '@/components/solutionMarketing/marketingStreamline/MarketingStreamline';
import 'bootstrap/dist/css/bootstrap.min.css';
const Page: React.FC = () => {
    return (
        <React.Fragment>
            <div className="transNav">
                <Navbar />
                <Banner />
                <MarketingExpertise />
                <MarketingEfficiency />
                <MarketingAutomate />
                <MarketingInsights />
                <MarketingTechnology />
                <MarketingStreamline />
                <Footer />
            </div>
        </React.Fragment>
    );
}

export default Page;
