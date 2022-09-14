import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCurrentPage } from '@/stores/slice';
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

  const currentPage = useAppSelector((state) => state.currentPage);
  const page = useMemo(() => {
    class pageState {
      #PER_PAGE_COUNT;
      #posts;
      #currentPage;

      constructor(posts: Ipost[], currentPage: number) {
        this.#PER_PAGE_COUNT = 6;
        this.#posts = [...posts];
        this.#currentPage = currentPage;
      }

      get offSet() {
        return (this.#currentPage - 1) * this.#PER_PAGE_COUNT;
      }

      get totalPageCount() {
        return Math.ceil(posts.length / this.#PER_PAGE_COUNT);
      }

      get currentPosts() {
        if (!this.#posts.length) return [];

        return this.#posts.slice(this.offSet, this.offSet + this.#PER_PAGE_COUNT);
      }

      changePage(pageCount: number) {
        return dispatch(setCurrentPage(pageCount));
      }
    }

    return new pageState(posts, currentPage);
  }, [dispatch, currentPage, posts]);

  const handlePage = useCallback(
    (move: string | undefined) => {
      if (move === 'prev') {
        return page.changePage(currentPage - 1);
      }

      if (move === 'next') {
        return page.changePage(currentPage + 1);
      }

      return page.changePage(Number(move));
    },
    [page, currentPage],
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
        {page.currentPosts.map(({ postId, title, tags, description, thumbnail, createdTime, link }) => (
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
        ))}
      </ul>

      <div className={styles.pageNationContainer}>
        <PageNation currentPage={currentPage} totalPage={page.totalPageCount} handlePage={handlePage} />
      </div>
    </>
  );
}
