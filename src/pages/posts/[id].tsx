import { getDetailPost, getPostsPath } from "@/apis";
import { NotionRenderer } from "react-notion-x";

import Link from "next/link";
import Image from "next/image";

import styles from "./[id].module.scss";
import PostNav from "@/components/PostNav";

import dynamic from "next/dynamic";
const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m: any) => {
    // additional prism syntaxes
    await Promise.all([import("prismjs/components/prism-bash.min.js")]);
    return m.Code;
  })
);

export default function Post({ recordMap, post }) {
  return (
    <div className={styles.container}>
      <h1>{post.title}</h1>
      <NotionRenderer
        recordMap={recordMap}
        // fullPage={true}
        // darkMode={true}
        components={{
          Code,
          nextImage: Image,
          nextLink: Link,
        }}
      />
      <PostNav post={post} />
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
  const { recordMap, resultPost: post } = await getDetailPost(params.id);

  return {
    props: {
      recordMap,
      post,
    },
  };
}
