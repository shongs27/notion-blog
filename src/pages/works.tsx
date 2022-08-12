import { getResume } from "@/apis";
import { NotionRenderer } from "react-notion-x";

import Link from "next/link";
import Image from "next/image";

import styles from "./about.module.scss";

import dynamic from "next/dynamic";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m: any) => m.Code)
);

export default function Works({ tags, posts }) {
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
  const notionDatabaseID = process.env.NOTION_DATABASE;
  const { tags, posts } = await getPostsAndTags(notionDatabaseID);

  // await generateSiteMap(posts);

  return {
    props: {
      tags,
      posts,
    },
  };
}
