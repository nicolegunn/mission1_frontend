import styles from "./NavBar.module.css";
import MenuBar from "./MenuBar";

export default function NavBar() {
  return (
      <div className={styles.NavBar}>
          <span className={styles.CompanyName}>Turners<span className={styles.GrayFont}>Insurance</span></span>
      <MenuBar />
    </div>
  );
}
