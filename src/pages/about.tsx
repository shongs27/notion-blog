import { getResume } from "@/apis";
import { NotionRenderer } from "react-notion-x";

import Link from "next/link";
import Image from "next/image";

import styles from "./about.module.scss";

import dynamic from "next/dynamic";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m: any) => m.Code)
);

export default function Post({ resume }) {
  console.log("레주메", resume);
  return (
    <div className={styles.container}>
      <div className={styles.responsivePost}>
        <NotionRenderer
          recordMap={resume}
          fullPage={false}
          components={{
            Code,
            nextImage: Image,
            nextLink: Link,
          }}
        />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const aboutId = "d32aca2407a045409e4e1df417678ecc";
  const resume = await getResume(aboutId);

  return {
    props: {
      resume,
    },
  };
}