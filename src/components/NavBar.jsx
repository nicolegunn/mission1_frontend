import styles from "./NavBar.module.css";
import MenuBar from "./MenuBar";

export default function NavBar() {
  return (
    <div className={styles.NavBar}>
      <MenuBar />
    </div>
  );
}
