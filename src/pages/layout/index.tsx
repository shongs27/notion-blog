import { Nav, FooterBar, MainDoor } from "@/components";

import styles from "./layout.module.scss";

import { LayoutProps } from "@/types/index";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <header>
        <Nav />
      </header>

      <main className={styles.main}>
        <div className={styles.pageMain}>{children}</div>
      </main>

      <footer>
        <FooterBar />
      </footer>
    </div>
  );
}
