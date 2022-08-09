import { getDetailPost, getPostsPath } from "@/apis";
import { NotionRenderer } from "react-notion-x";

import Link from "next/link";
import Image from "next/image";

import styles from "./[id].module.scss";

export default function Post({ recordMap }) {
  return (
    <div className={styles.container}>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        components={{
          nextImage: Image,
          nextLink: Link,
        }}
      />
    </div>
  );
}

export async function getStaticPaths() {
  const notionDatabaseID = "68746bcb1cf943d18cc342bf51050af0";
  const posts = await getPostsPath(notionDatabaseID);

  const paths = posts.map((post) => ({
    params: { id: post.postId },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { recordMap } = await getDetailPost(params.id);
  return {
    props: {
      recordMap,
    },
  };
}
