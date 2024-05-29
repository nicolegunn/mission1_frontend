import styles from "./NavBar.module.css";
import MenuBar from "./components/MenuBar";

export default function NavBar() {
  return (
    <div className={styles.NavBar}>
      <div className={styles.LogoAndCompanyName}>
        <img className={styles.Logo} src="/favicon.ico" />
        <span className={styles.CompanyName}>
          Turners<span className={styles.GrayFont}>Insurance</span>
        </span>
      </div>
      <MenuBar />
    </div>
  );
}
