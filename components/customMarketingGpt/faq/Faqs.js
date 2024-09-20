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
              <Accordion.Header>What is Custom GPT?</Accordion.Header>
              <Accordion.Body>
              Custom GPT is a tailored AI model designed to generate human-like text based on specific needs and data.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How can Custom GPT benefit my business?
              </Accordion.Header>
              <Accordion.Body>
              It enhances customer engagement, streamlines operations, and automates routine tasks, saving time and resources.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>How do I integrate Custom GPT into my systems?
              </Accordion.Header>
              <Accordion.Body>
              Custom GPT can be integrated via APIs, allowing it to connect seamlessly with your software and applications.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Is my data secure with Custom GPT?</Accordion.Header>
              <Accordion.Body>
              Yes, data security is a priority, with robust encryption and industry-standard practices to protect your information.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Can Custom GPT be trained on my business data?
              </Accordion.Header>
              <Accordion.Body>
              Yes, it can be fine-tuned with your data to understand specific terminology and context, providing accurate and relevant responses.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion> */}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Faqs;
