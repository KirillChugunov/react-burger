import styles from "./preloader.module.css";
import { FunctionComponent } from "react";

export const Preloader:FunctionComponent = () => {
  return (
    <div className={styles.preloader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
