import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import MainImage from "@/app/images/recipe-image.jpg";

export default async function Home() {
  return (
    <main className={styles.main}>
      <section className={styles["title-container"]}>
        <h1>FoodFinder</h1>
        <p>Use the search or the recipe listing page to find your next meal!</p>
      </section>
      <section className={styles["section"]}>
        <Link href="/recipes">Find a Recipe</Link>
      </section>
      <section className={styles["image-section"]}>
      <Image alt="test" src={MainImage} />
      </section>
    </main>
  );
}
