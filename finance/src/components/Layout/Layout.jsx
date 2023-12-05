import React from "react";
import Footer from "./Footer";
import styles from "./Layout.module.css";

const Layout = ({ children }) => (
  <div className={styles.layoutContent}>
    <div className={styles.layoutContentContainer}>{children}</div>
    <Footer />
  </div>
);

export default Layout;
