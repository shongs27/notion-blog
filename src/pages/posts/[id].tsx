import { getDetailPost, getPostsPath } from "@/apis";
import { NotionRenderer } from "react-notion-x";

import Link from "next/link";
import Image from "next/image";

import styles from "./[id].module.scss";
import PostNav from "@/components/PostNav";

import dynamic from "next/dynamic";

import { ExtendedRecordMap } from "notion-types";

interface Ipost {
  recordMap: ExtendedRecordMap;
  post: any;
}

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m: any) => m.Code)
);

export default function Post({ recordMap, post }: Ipost) {
  return (
    <div className={styles.container}>
      <div className={styles.responsivePost}>
        <div>
          <h1>{post.title}</h1>
          <p>{post.createdTime}</p>
          <p>작성자 : 홍원배</p>
        </div>

        <NotionRenderer
          recordMap={recordMap}
          fullPage={false}
          components={{
            Code,
            nextImage: Image,
            nextLink: Link,
          }}
        />
        <PostNav post={post} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const notionDatabaseID = process.env.NOTION_DATABASE;
  const posts = await getPostsPath(notionDatabaseID!);

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
