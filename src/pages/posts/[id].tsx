import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import styles from './postDetail.module.scss';
import { Ipost } from '@/types/index';
import { ExtendedRecordMap } from 'notion-types';
import { GetStaticProps } from 'next';

import { defaultMapImageUrl, MapImageUrlFn, NotionRenderer } from 'react-notion-x';

import PostNav from '@/components/PostNav';
import { getDetailPost, getPostIDs, getPostsPath } from '@/lib';

interface DetailPage {
  recordMap: ExtendedRecordMap;
  post: Ipost;
  nav: string[];
}

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m: any) => m.Code));

export default function Post({ recordMap, post, nav }: DetailPage) {
  const mapImageUrl: MapImageUrlFn = (url, block) => {
    const u = new URL(url);

    if (u.pathname.startsWith('/secure.notion-static.com') && u.hostname.endsWith('.amazonaws.com')) {
      if (
        u.searchParams.has('X-Amz-Credential') &&
        u.searchParams.has('X-Amz-Signature') &&
        u.searchParams.has('X-Amz-Algorithm')
      ) {
        url = '/image/' + encodeURIComponent(url);
      }
    }

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
        <PostNav post={post} nav={nav} />
      </div>
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
