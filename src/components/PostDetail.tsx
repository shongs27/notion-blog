import styles from './postDetail.module.scss';
import { ExtendedRecordMap } from 'notion-types';
import { Ipost } from '../types';

import PostNav from './PostNav';
import MappedNotionRenderer from './MappedNotionRenderer';

interface DetailPage {
  recordMap: ExtendedRecordMap;
  post: Ipost;
  nav: string[];
}

export default function PostDetail({ recordMap, post, nav }: DetailPage) {
  return (
    <div className={styles.container}>
      <div className={styles.postHeader}>
        <h1>{post.title}</h1>
        <p>{post.createdTime}</p>
        <p>작성자 : 홍원배</p>
      </div>

      <MappedNotionRenderer recordMap={recordMap} />

      <PostNav post={post} nav={nav} />
    </div>
  );
}
