import React, { useState } from "react";

interface TooltipProps {
  description: string;
  position: string;
}

const Tooltip: React.FC<TooltipProps> = ({ description, position }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <button
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="/assets/node_icon/info-circle.svg"
          alt="info icon"
          className="relative mt-[5px]"
        />
      </button>

      {isHovered && (
        <div
          className={`absolute ${position} mb-2 w-[250px] bg-white border-[1px] rounded-[10px] border-[#D3D3D3] p-2 break-words before:absolute before:left-[25px] before:bottom-0 before:w-[12px] before:h-[0px] before:bg-white before:border-[1px] before:border-[#fff] before:z-10`}
        >
          <p className="mb-0 font-[400] text-[9px] text-[#14171B]">{description}</p>
          <img
            src="/assets/node_icon/Polygon-shape.svg"
            alt="polygon shape"
            className="absolute bottom-[-7px] left-[25px]"
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
