import type { NextPage } from "next";
import Head from "next/head";

import styles from "./home.module.scss";
import { useRouter } from "next/router";
import { MainDoor } from "@/components";

const Home: NextPage = () => {
  const { pathname } = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Hong&apos;s blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {pathname === "/" && (
        <div className={styles.pageIntro}>
          <MainDoor />
        </div>
      )}
    </div>
  );
};

export default Home;
