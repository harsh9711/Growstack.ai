import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Modals from "./Modals";
import "./VideoBanner.scss";

function VideoBanner() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const videoUrl = "/images_growstack/video/intoVideo.mp4";
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div
        className="videoBanner"
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-duration="1000"
      >
        <div className="container">
          <div className="block">
            <div className="content">
              <h3>
                Lorem Ipsum <span>amet consectetur.</span>
              </h3>
              <p onClick={handleShow} style={{ cursor: "pointer" }}>
                <img src="/images_growstack/home/play.svg" alt="play" /> Watch
                video
              </p>
            </div>
            <div className="imgBlock">
              <img
                onClick={handleShow}
                style={{ cursor: "pointer" }}
                src="/images_growstack/home/videoPlay.svg"
                alt="videoPlay"
              />
            </div>
          </div>
        </div>
      </div>

      <Modals show={show} handleClose={handleClose} videoUrl={videoUrl} />
    </React.Fragment>
  );
}

export default VideoBanner;
