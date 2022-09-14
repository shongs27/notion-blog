import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { changeCurrentPage } from '@/stores/slice';

import styles from './posts.module.scss';
import { InitialPage } from '../types';

import Tags from './Tags';
import PageNationContainer from './PageNationContainer';

export default function Posts({ posts = [], tags = [] }: InitialPage) {
  const selectedTag = useAppSelector((state) => state.selectedTag);
  const dispatch = useAppDispatch();

  if (selectedTag !== '전체') {
    posts = posts.filter((post) => post.tags.some((tag) => tag.name === selectedTag));
  }

  useEffect(() => {
    dispatch(changeCurrentPage(1));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <h1>
          <span className={styles.title}>{selectedTag}</span>
          <span className={styles.titleCount}>{posts?.length}</span>
        </h1>
        <Tags tags={tags} />
        <PageNationContainer posts={posts} />
      </div>
    </div>
  );
}
