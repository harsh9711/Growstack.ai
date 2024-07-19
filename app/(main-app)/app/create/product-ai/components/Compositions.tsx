import Motion from "@/components/Motion";
import React from "react";
import { compositions } from "./data";
import CompositionCard from "./cards/CompositionCard";

export default function Compositions() {
  return (
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="grid grid-cols-2 gap-2">
        {compositions.map((data, index) => (
          <CompositionCard {...data} key={index}/>
        ))}
      </div>
    </Motion>
  );
}
