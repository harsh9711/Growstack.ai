import React from "react";

const RepeatText = () => {
  const repeatCount = 20;
  const texts = Array.from({ length: repeatCount }, (_, i) => ` WE ARE GROWSTACK `);

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {texts.map((text, index) => (
          <h2
            key={index}
            className="marquee-text"
          >
            {text}{" "}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default RepeatText;
