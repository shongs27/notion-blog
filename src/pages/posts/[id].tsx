import { getDetailPost, getPostsPath } from "@/lib";
import {
  defaultMapImageUrl,
  MapImageUrlFn,
  NotionRenderer,
} from "react-notion-x";

import Link from "next/link";
import Image from "next/image";

import styles from "./postDetail.module.scss";
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
  const mapImageUrl: MapImageUrlFn = (url, block) => {
    return defaultMapImageUrl(url, block)!;
  };

  return (
    <div className={styles.container}>
      <div className={styles.postPosition}>
        <div className={styles.postHeader}>
          <h1>{post.title}</h1>
          <p>{post.createdTime}</p>
          <p>작성자 : 홍원배</p>
        </div>

        <NotionRenderer
          recordMap={recordMap}
          fullPage={false}
          darkMode={true}
          components={{
            Code,
            nextImage: Image,
            nextLink: Link,
          }}
          mapImageUrl={mapImageUrl}
        />
        <PostNav post={post} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const notionDatabaseID = process.env.NOTION_POSTS_DATABASE;
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
