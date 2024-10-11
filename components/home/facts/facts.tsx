import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./facts.scss";
import Link from "next/link";
import RightArrow from "@/components/svgs/rightArrow";

function Facts() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className='facts'>
                <div className='container'>
                    <div className='flex flex-col gap-6 md:flex-row'>
                        <div className='w-full sm:w-1/2  flex flex-col gap-y-2' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <span className='user w-fit my-3'>GrowStack Facts</span>

                            <p className="header text-left text-[24px] sm:text-[38px]">
                                <span className=" font-bold">Driven by Expertise,</span>
                                <br />
                                <span>
                                    Refined by Feedback
                                </span>
                            </p>


                            <Link href="/auth/register" className='sheen getStart'>
                                Get Started Now
                                <RightArrow color="#034737" />
                            </Link>
                        </div>

                        <div className='w-full sm:w-1/2 ' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="stats">
                                    <h3>600+</h3>
                                    <span>Hours of development</span>
                                </div>
                                <div className="stats">
                                    <h3>50+</h3>
                                    <span>User feedback sessions</span>
                                </div>
                                <div className="stats">
                                    <h3>20+</h3>
                                    <span>Key features designed</span>
                                </div>
                                <div className="stats">
                                    <h3>20+</h3>
                                    <span>Years of industry experience</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Facts;
