import Image from "next/image";
import React from "react";
import styles from "@/styles/modules/suspense.module.css";

export default function SuspenseLoader() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.pulsate}>
        <Image src="/logo/growstack.png" alt="" height="100" width="100" />
      </div>
    </div>
  );
}
