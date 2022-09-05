import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import styles from './about.module.scss';
import { ExtendedRecordMap } from 'notion-types';

import { defaultMapImageUrl, MapImageUrlFn, NotionRenderer } from 'react-notion-x';

import { getResume } from '@/lib';
const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m: any) => m.Code));

interface IAbout {
  resume: ExtendedRecordMap;
}

export default function About({ resume }: IAbout) {
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
        <NotionRenderer
          recordMap={resume}
          fullPage={false}
          darkMode={true}
          components={{
            Code,
            nextImage: Image,
            nextLink: Link,
          }}
          mapImageUrl={mapImageUrl}
        />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const aboutId = process.env.NOTION_RESUME;
  const resume = await getResume(aboutId!);

  return {
    props: {
      resume,
    },
    revalidate: 10,
  };
}
