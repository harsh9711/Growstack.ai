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
                        <div className='col-md-6 flex flex-col gap-y-2' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <span className='user w-fit my-3'>GrowStack Facts</span>

                            <h2 className='text-[38px]'>
                                <span className="font-bold">Driven by Expertise,</span> <br /> <span className="font-extralight"> Refined by Feedback</span>
                            </h2>

                            <Link href="/auth/register" className='sheen getStart'>
                                More About Us
                                <RightArrow color="#034737" />
                            </Link>
                        </div>

                        <div className='col-md-6' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="stats">
                                    <h3>600+</h3>
                                    <span>Hours of development</span>
                                </div>
                                <div className="stats">
                                    <h3>600+</h3>
                                    <span>Hours of development</span>
                                </div>
                                <div className="stats">
                                    <h3>600+</h3>
                                    <span>Hours of development</span>
                                </div>
                                <div className="stats">
                                    <h3>600+</h3>
                                    <span>Hours of development</span>
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
