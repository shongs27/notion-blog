import { getDetailPost, getPostsPath } from '@/lib';
import { defaultMapImageUrl, MapImageUrlFn, NotionRenderer } from 'react-notion-x';

import Link from 'next/link';
import Image from 'next/image';

import styles from './postDetail.module.scss';
import PostNav from '@/components/PostNav';

import dynamic from 'next/dynamic';

import { ExtendedRecordMap } from 'notion-types';
import { GetStaticProps } from 'next';
import { Ipost } from '@/types/index';

interface DetailPage {
  recordMap: ExtendedRecordMap;
  post: Ipost;
}

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m: any) => m.Code));

export default function Post({ recordMap, post }: DetailPage) {
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
        <PostNav post={post} />
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const notionDatabaseID = process.env.NOTION_POSTS_DATABASE;
  const posts = await getPostsPath(notionDatabaseID!);
  const postsIDs = posts.map(({ postId }) => postId).reverse();

  const paths = posts.map((post) => ({
    params: { id: post.postId, postsIDs },
  }));

  return { paths, fallback: false };
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

  const { recordMap, resultPost: post } = await getDetailPost(params.id);

  return {
    props: {
      recordMap,
      post,
    },
    revalidate: 10,
  };
};
