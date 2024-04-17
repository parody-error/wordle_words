import styles from "./page.module.css";
import { Tile } from "../components/Tile"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Tile />
      </div>
    </main>
  );
}
