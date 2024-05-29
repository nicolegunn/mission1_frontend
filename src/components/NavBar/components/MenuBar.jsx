import styles from "./MenuBar.module.css";
export default function MenuBar() {
  return (
    <div className={styles.MenuBar}>
      <span className={styles.HamburgerBars}>&#9776;</span>
    </div>
  );
}
