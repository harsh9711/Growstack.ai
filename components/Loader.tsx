import React from "react";
import styles from "../styles/modules/loader.module.css";

const Loader: React.FC<{
  display: boolean;
}> = props => {
  const { display } = props;
  return display ? (
    <div className={styles.overlay}>
      <div className={styles.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null;
};

export default Loader;
