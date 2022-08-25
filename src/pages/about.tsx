import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import styles from './posts/postDetail.module.scss';
import { ExtendedRecordMap } from 'notion-types';

import { NotionRenderer } from 'react-notion-x';

import { getResume } from '@/lib';
const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m: any) => m.Code));

interface IAbout {
  resume: ExtendedRecordMap;
}

export default function About({ resume }: IAbout) {
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
