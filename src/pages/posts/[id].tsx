import styles from './id.module.scss';
import { Ipost } from '@/types/index';
import { ExtendedRecordMap } from 'notion-types';
import { GetStaticProps } from 'next';

import { getDetailPost, getPostIDs, getPostsPath } from '@/lib';
import PostDetail from '@/components/PostDetail';
import TableOfContents from '@/components/TableofContents';

interface DetailPage {
  recordMap: ExtendedRecordMap;
  post: Ipost;
  nav: string[];
}

export default function Post({ recordMap, post, nav }: DetailPage) {
  return (
    <div className={styles.container}>
      {/* <div style={{ minHeight: '200px' }}></div> */}
      <PostDetail recordMap={recordMap} post={post} nav={nav} />
      <TableOfContents postId={post.postId} />
    </div>
  );
}

export const getStaticPaths = async () => {
  const notionDatabaseID = process.env.NOTION_POSTS_DATABASE;
  const posts: any = await getPostsPath(notionDatabaseID!);

  const paths = posts.map((post: any) => ({
    params: { id: post.postId },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.id !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const [{ recordMap, resultPost: post }, nav] = await Promise.all([
    getDetailPost(params.id),
    getPostIDs(process.env.NOTION_POSTS_DATABASE!),
  ]);

  return {
    props: {
      recordMap,
      post,
      nav,
    },
    revalidate: 10,
  };
};
