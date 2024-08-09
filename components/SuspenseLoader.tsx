import Image from "next/image";
import React from "react";
import styles from "@/styles/modules/suspense.module.css";

export default function SuspenseLoader() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.pulsate}>
        <Image src="/logo/growstack-mini.png" alt="" height="80" width="80" />
      </div>
    </div>
  );
}
