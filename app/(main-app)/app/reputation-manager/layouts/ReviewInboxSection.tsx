import Motion from "@/components/Motion";
import React from "react";

export default function ReviewInboxSection() {
  return (
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div>ReviewInboxSection</div>
    </Motion>
  );
}
