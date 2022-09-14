import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { changeCurrentPage } from '@/stores/slice';
import { useRouter } from 'next/router';
import Image from 'next/image';

import styles from './pageNationContainer.module.scss';
import { Ipost } from '@/types/index';

import PageNation from './PageNation';

interface IPosts {
  posts: Ipost[];
}

export default function PageNationContainer({ posts }: IPosts) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { currentPage, PER_PAGE_COUNT, offSet } = useAppSelector((state) => state.page);
  const totalPage = Math.ceil(posts.length / PER_PAGE_COUNT);

  const handlePage = useCallback(
    (move: string | undefined) => {
      if (move === 'prev') {
        return dispatch(changeCurrentPage(currentPage - 1));
      }

      if (move === 'next') {
        return dispatch(changeCurrentPage(currentPage + 1));
      }

      return dispatch(changeCurrentPage(Number(move)));
    },
    [dispatch, currentPage],
  );

  const handleClick = (postId: string, link: string) => {
    if (router.pathname === '/works') {
      return window.open(`${link}`, '_blank');
    }

    return router.push({
      pathname: `/posts/[id]`,
      query: { id: postId },
    });
  };

  return (
    <>
      <ul className={styles.postList}>
        {posts.length ? (
          posts
            .slice(offSet, offSet + PER_PAGE_COUNT)
            .map(({ postId, title, tags, description, thumbnail, createdTime, link }) => (
              <li key={postId}>
                <button type="button" onClick={() => handleClick(postId, link)}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={thumbnail || '/bear.jpg'}
                      alt="썸네일"
                      width={260}
                      height={130}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcO2tmGgAF5AI47uVMUgAAAABJRU5ErkJggg=="
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
