import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Interface.scss";
import Link from "next/link";
function Interface() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className='interface'>
                <div className='container'>
                    <div className='flex flex-col sm:flex-row items-center justify-between'>
                        <div className='w-full sm:w-1/2 ' data-aos='fade-right' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <div className='content'>
                                <span className='user'>Smooth interface</span>
                                <h3>Chat with your AI assistant</h3>
                                <p>
                                    Welcome to your AI assistant chat! Whether you need help with coding, general inquiries, or brainstorming ideas,
                                    your AI assistant is here to assist. Feel free to ask questions, seek advice, or request specific information.
                                </p>
                                <Link href='/auth/register' className='sheen'>
                                    Explore <img src='/images_growstack/home/arrow.svg' alt='arrow' />
                                </Link>
                            </div>
                        </div>
                        <div className='w-full sm:w-1/2 ' data-aos='fade-left' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <div className='interFaceImg'>
                                <img src='/images_growstack/salesMarketing/interface.png' alt='interface' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Interface;
