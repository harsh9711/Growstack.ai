import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Faqs.scss";

function Faqs() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className='faqs'>
                <div className='container'>
                    <div className='title' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                        <span className='user'>FAQ</span>
                        <h3 className='heading'>
                            <span>Quick answers</span> on GrowStack
                        </h3>
                    </div>
                    {/* <Accordion data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000">
            <Accordion.Item eventKey="0">
              <Accordion.Header>How can GrowStack transform my business strategies into success stories?</Accordion.Header>
              <Accordion.Body>
              "Sign up on our website and explore our AI-driven features. For personalized guidance, our customer support team is always ready to assist you."
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Can I upgrade or downgrade my plan at any time?
              </Accordion.Header>
              <Accordion.Body>
              "Yes, you have the flexibility to upgrade or downgrade your plan anytime, ensuring you always have the right tools for your business needs."
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>How does GrowStack address unique business challenges with tailored solutions?
              </Accordion.Header>
              <Accordion.Body>
              "Our AI-powered tools adapt to your specific needs, offering personalized solutions that tackle your unique business challenges effectively."
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>What benefits does GrowStack offer for businesses seeking growth and efficiency?</Accordion.Header>
              <Accordion.Body>
              "GrowStack provides AI-powered efficiency, seamless integration, and data-driven insights, helping your business achieve exceptional growth and productivity."
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Is my data secure with GrowStack?
              </Accordion.Header>
              <Accordion.Body>
              "Absolutely. We partner with all major LLMs, offering choice and flexibility while ensuring your data is 100% secure and exclusively yours."
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>How can I manage my business on the go with GrowStack?
              </Accordion.Header>
              <Accordion.Body>
              "Our intuitive mobile app allows you to stay productive and in control from anywhere, offering real-time access to tasks and insights."
              </Accordion.Body>
            </Accordion.Item>
          </Accordion> */}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Faqs;
