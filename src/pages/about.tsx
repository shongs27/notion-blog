import { getResume } from "@/lib";
import { NotionRenderer } from "react-notion-x";

import Link from "next/link";
import Image from "next/image";

import styles from "./posts/postDetail.module.scss";

import dynamic from "next/dynamic";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m: any) => m.Code)
);

export default function About({ resume }) {
  return (
    <div className={styles.container}>
      <div className={styles.postPosition}>
        <NotionRenderer
          recordMap={resume}
          fullPage={false}
          darkMode={true}
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
  const aboutId = process.env.NOTION_RESUME;
  const resume = await getResume(aboutId);

  return {
    props: {
      resume,
    },
  };
}
