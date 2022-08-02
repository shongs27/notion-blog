import styles from "./footerBar.module.scss";

export default function FooterBar() {
  return (
    <div className={styles.footer}>
      <p>Design By 홍원배 | 작성자</p>
      <p>Copyright ⓒ 2022 Hongs All Rights Reserved.</p>
    </div>
  );
}
