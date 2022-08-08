import Head from "next/head";

import styles from "./home.module.scss";
import { MainDoor } from "@/components";
import PostsList from "@/components/PostsList";
import { getPostsAndTags } from "@/apis";
import { useAppSelector } from "@/hooks/redux";
import { InitialPage } from "../types";

const Home = ({ tags, posts }: InitialPage) => {
  const clickedBlog = useAppSelector((state) => state.clickedBlog);

  return (
    <div className={styles.container}>
      <Head>
        <title>Hong&apos;s blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!clickedBlog && <MainDoor />}
      <PostsList tags={tags} posts={posts} />
    </div>
  );
};

export async function getStaticProps() {
  const notionDatabaseID = "68746bcb1cf943d18cc342bf51050af0";
  const { tags, posts } = await getPostsAndTags(notionDatabaseID);

  // await generateSiteMap(posts);

  return {
    props: {
      tags,
      posts,
    },
  };
}

export default Home;
