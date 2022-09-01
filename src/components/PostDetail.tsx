import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import styles from './postDetail.module.scss';
import { ExtendedRecordMap } from 'notion-types';
import { defaultMapImageUrl, MapImageUrlFn, NotionRenderer } from 'react-notion-x';
import { Ipost } from '../types';

import PostNav from './PostNav';

interface DetailPage {
  recordMap: ExtendedRecordMap;
  post: Ipost;
  nav: string[];
}

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m: any) => m.Code));

export default function PostDetail({ recordMap, post, nav }: DetailPage) {
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
  );
}
