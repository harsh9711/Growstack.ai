import React from "react";
import "./Banner.scss";
import Link from "next/link";

function Circle() {
  const links = [
    "https://www.growstack.ai/",
    "https://www.growstack.ai/",
    "https://www.growstack.ai/",
    "https://www.growstack.ai/",
    "https://www.growstack.ai/",
    "https://www.growstack.ai/",
    "https://www.growstack.ai/",
    "https://www.growstack.ai/",
    "https://www.growstack.ai/",
    "https://www.growstack.ai/",
    "https://www.growstack.ai/",
    "https://www.growstack.ai/",
  ]; // Update these links as per your routes

  return (
    <div className="position-relative vh-100">
      <div className="circle outer-circle">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            className="icon-container"
            key={i}
            style={{
              transform: `rotate(${i * 30}deg) translate(650px) rotate(-${i * 30}deg)`,
            }}
          >
            <Link href={links[i]}>
              <div className={`icon bg-${i % 7}`}>
                <img
                  alt="icons"
                  src={`/images_growstack/banner/icons${(i % 7) + 1}.svg`}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="circle inner-circle">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            className="icon-container"
            key={i}
            style={{
              transform: `rotate(${i * 30}deg) translate(500px) rotate(-${i * 30}deg)`,
            }}
          >
            <Link href={links[i]}>
              <div className={`icon bg-${i % 7}`}>
                <img
                  alt="icons"
                  src={`/images_growstack/banner/icons${(i % 7) + 1}.svg`}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Circle;
