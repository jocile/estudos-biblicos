import Link from "next/link";
import styles from "./MenuBar.module.css";

export default function MenuBar() {
  return (
    <nav className={styles.menuBar} aria-label="Navegação principal">
      <Link href="/" className={styles.logo}>
        <span className={styles.logoIcon}>📖</span>
        <span className={styles.logoText}>Estudos Bíblicos</span>
      </Link>

      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Início</Link>
        </li>
      </ul>
    </nav>
  );
}
