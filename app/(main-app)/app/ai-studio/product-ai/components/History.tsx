import Motion from "@/components/Motion";
import React from "react";
import CompositionCard from "./cards/CompositionCard";
import { historyProps } from "../interface/history";

interface IHistory {
  history: historyProps[];
}

export default function History({ history }: IHistory) {
  return (
    <Motion transition={{ duration: 0.5 }} variants={{}}>
      {history.map((data, index) => (
        <CompositionCard {...data} key={index} />
      ))}
    </Motion>
  );
}
