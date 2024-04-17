"use client";

import styles from "./page.module.css";
import { TileRowGrid } from "../components/TileRowGrid"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <TileRowGrid />
      </div>
    </main>
  );
}
