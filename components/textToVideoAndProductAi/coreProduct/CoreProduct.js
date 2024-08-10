import React, { useEffect, useRef } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import './CoreProduct.scss';

function CoreProduct() {
  const blocksRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    AOS.init();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      {
        threshold: 0.9, // Adjusted threshold
      }
    );

    const blocks = blocksRef.current.filter(Boolean); // Ensure all elements are valid
    blocks.forEach(block => observer.observe(block));

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      blocks.forEach(block => observer.unobserve(block));

      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <React.Fragment>
      <div className="coreProduct">
        <div className="container">
          <div className="wrapper">
            <div className="title mb-3 mb-md-5" data-aos="fade-up"
                 data-aos-easing="ease-in-sine"
                 data-aos-duration="1000"
                 ref={titleRef}>
              <span className="user">Core Features</span>
              <h3 className="heading"><span>How to create </span>AI product photos</h3>
            </div>
            <div className="contentBlock">
              <div className="row align-items-center">
                <div className="col-md-6" data-aos="fade-right"
                     data-aos-easing="ease-in-sine"
                     data-aos-duration="1000">
                  <div className="content">
                    {[
                      { title: "Choose your photoshoot style", description: "Select from a variety of styles to create the perfect look for your product photos." },
                      { title: "Upload your product image", description: "Upload a clear photo of your product, ensuring it's centered and free from shadows or obstructions." },
                      { title: "Generate product photos", description: "Product AI will generate numerous options for you to choose from. You'll also receive images of your product on both a white background and transparent background." },
                      { title: "Save and share", description: "Download your product images and upload them to your online store, such as Shopify or Etsy. Alternatively, share your product photos on social media platforms like Facebook or Instagram. Start selling more products today" }
                    ].map((block, index) => (
                      <div 
                        key={index}
                        ref={el => blocksRef.current[index] = el}
                        className="block"
                      >
                        <h3>{block.title}</h3>
                        <p>{block.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-md-6" data-aos="fade-left"
                     data-aos-easing="ease-in-sine"
                     data-aos-duration="1000">
                  <div className="imgBlock">
                    <img src="/images_growstack/textVideo/product.svg" alt="product" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CoreProduct;
