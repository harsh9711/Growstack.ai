import Image from "next/image";
import React from "react";
import styles from "@/styles/modules/suspense.module.css";

export default function SuspenseLoader() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.pulsate}>
        <Image src="/logo/growstack1.png" alt="" height="280" width="280" />
      </div>
    </div>
  );
}
