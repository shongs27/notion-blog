import styles from './layout.module.scss';

import Nav from './Nav';
import FooterBar from './FooterBar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <header>
        <Nav />
      </header>

      <main className={styles.main}>{children}</main>

      <footer>
        <FooterBar />
      </footer>
    </div>
  );
}
