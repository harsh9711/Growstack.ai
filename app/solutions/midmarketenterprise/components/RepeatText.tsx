  import React from "react";

  const RepeatText = () => {
      const repeatCount = 20;
      const texts = Array(repeatCount).fill("WE ARE GROWSTACK");
    
      return (
          <div className="relative overflow-hidden w-full h-[160px]">
          <div className="marquee-container">
            <div className="marquee-content">
              {texts.map((text, index) => (
                <h2
                  key={index}
                  className="text-[92.11px] font-bold text-transparent whitespace-nowrap"
                  style={{
                    WebkitTextStroke: '1px #E9E9E9',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {text}
                </h2>
              ))}
            </div>
          </div>
        </div>
      );
    };
    export default RepeatText
    