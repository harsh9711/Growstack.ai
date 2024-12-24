import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Editing() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <React.Fragment>
      <div className="overflow-hidden">
        <div className="container">
          <div
            className="flex flex-col sm:flex-row items-center gap-4"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <div className="w-full sm:w-5/12">
              <span className="text-lg font-semibold text-gray-700">
                Core Features
              </span>
              <h3 className="mt-2 mb-2 sm:mb-0 text-2xl font-bold text-gray-900">
                <span>Beyond background</span> editing
              </h3>
            </div>
            <div className="w-full sm:w-7/12">
              <p className="text-gray-600">
                Achieve polished and compelling product imagery that captivates
                your audience and showcases your brand's excellence with expert
                background editing that goes beyond ordinary standards.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {[
              {
                img: "/images_growstack/textVideo/edit1.svg",
                title: "Background remover",
                desc: "Cutout Images",
              },
              {
                img: "/images_growstack/textVideo/edit2.svg",
                title: "Magic eraser",
                desc: "Remove objects",
              },
              {
                img: "/images_growstack/textVideo/edit3.svg",
                title: "Batch edit",
                desc: "Edit multiple photos",
              },
              {
                img: "/images_growstack/textVideo/edit4.svg",
                title: "Colorize",
                desc: "Colorize your image",
              },
              {
                img: "/images_growstack/textVideo/edit5.svg",
                title: "Upscaler",
                desc: "Increase resolution",
              },
              {
                img: "/images_growstack/textVideo/edit6.svg",
                title: "Photo maker",
                desc: "Make a profile photo",
              },
            ].map((item, index) => (
              <div
                key={index}
                className=""
                data-aos="fade-up"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
              >
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex-shrink-0">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="flex flex-col items-center justify-center sm:items-start">
                    <h4 className="text-lg sm:text-start text-center font-bold text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm sm:text-start text-center text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Editing;
