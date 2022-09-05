import styles from './about.module.scss';
import { ExtendedRecordMap } from 'notion-types';

import { getResume } from '@/lib';
import MappedNotionRenderer from '@/components/MappedNotionRenderer';

interface IAbout {
  resume: ExtendedRecordMap;
}

export default function About({ resume }: IAbout) {
  return (
    <div className={styles.container}>
      <div className={styles.postPosition}>
        <MappedNotionRenderer recordMap={resume} />
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
