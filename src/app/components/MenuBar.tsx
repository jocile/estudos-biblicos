import Link from "next/link";
import styles from "./MenuBar.module.css";
import SearchButton from "./SearchButton";
import { getStudies } from "@/lib/markdown";

export default async function MenuBar() {
  const studies = await getStudies();

  const studyIndex = studies.map(({ slug, metadata }) => ({
    slug,
    title: metadata.title ?? '',
    description: metadata.description ?? '',
    category: metadata.category ?? '',
    tags: metadata.tags ?? [],
  }));

  return (
    <nav className={styles.menuBar} aria-label="Navegação principal">
      <Link href="/" className={styles.logo}>
        <span className={styles.logoIcon}>📖</span>
        <span className={styles.logoText}>Estudos Bíblicos</span>
      </Link>

      <SearchButton studyIndex={studyIndex} />

      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Início</Link>
        </li>
      </ul>
    </nav>
  );
}
