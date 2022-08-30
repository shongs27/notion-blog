import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCurrentPage } from '@/stores/slice';
import { useRouter } from 'next/router';
import Image from 'next/image';

import styles from './posts.module.scss';
import { Ipost } from '@/types/index';

import PageNation from './PageNation';

interface IPosts {
  posts: Ipost[];
}

export default function Posts({ posts }: IPosts) {
  const currentPage = useAppSelector((state) => state.currentPage);
  const dispatch = useAppDispatch();

  const router = useRouter();

  //pagenation => class로 바꿔보기
  const PER_PAGE_COUNT = 6;
  const offset = (currentPage - 1) * PER_PAGE_COUNT;
  const totalPage = Math.ceil(posts.length / PER_PAGE_COUNT);

  const handleClick = (postId: string, link: string) => {
    if (router.pathname === '/works') {
      return window.open(`${link}`, '_blank');
    }

    return router.push({
      pathname: `/posts/[id]`,
      query: { id: postId },
    });
  };

  const handlePage = useCallback(
    (move: string | undefined) => {
      if (move === 'prev') {
        return dispatch(setCurrentPage(currentPage - 1));
      }

      if (move === 'next') {
        return dispatch(setCurrentPage(currentPage + 1));
      }

      return dispatch(setCurrentPage(Number(move)));
    },
    [dispatch, currentPage],
  );

  return (
    <>
      <ul className={styles.postList}>
        {posts.length ? (
          posts
            .slice(offset, offset + PER_PAGE_COUNT)
            .map(({ postId, title, tags, description, thumbnail, createdTime, link }) => (
              <li key={postId}>
                <button type="button" onClick={() => handleClick(postId, link)}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={
                        thumbnail ||
                        'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg'
                      }
                      alt="썸네일"
                      width={260}
                      height={120}
                    />
                  </div>

                  <h2>{title}</h2>

                  <div className={styles.postMeta}>
                    <div className={styles.metaTags}>
                      {tags.map(({ name, color }) => (
                        <span key={name} style={{ backgroundColor: color }}>
                          {name}
                        </span>
                      ))}
                    </div>
                    <div className={styles.metaETC}>
                      <span>{createdTime}</span>
                      <span> 홍원배 </span>
                    </div>
                  </div>

                  <p className={styles.postContents}>
                    {description?.length > 80 ? `${description.slice(0, 80)}...` : description}
                  </p>
                </button>
              </li>
            ))
        ) : (
          <p>해당 포스팅이 없습니다</p>
        )}
      </ul>

      <div className={styles.pageNationContainer}>
        <PageNation currentPage={currentPage} totalPage={totalPage} handlePage={handlePage} />
      </div>
    </>
  );
}
