import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCurrentPage } from '@/stores/slice';
import { useEffect } from 'react';
import { InitialPage } from '../types';

import styles from './postList.module.scss';

import Posts from './Posts';
import Tags from './Tags';

export default function PostList({ posts, tags }: InitialPage) {
  const selectedTag = useAppSelector((state) => state.selectedTag);
  const dispatch = useAppDispatch();

  if (selectedTag !== '전체') {
    posts = posts.filter((post) => post.tags.some((tag) => tag.name === selectedTag));
  }

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.postList}>
        <h1>
          <span className={styles.title}>{selectedTag}</span>
          <span className={styles.titleCount}>{posts?.length}</span>
        </h1>
        <Tags tags={tags} />
        <Posts posts={posts} />
      </div>
    </div>
  );
}
