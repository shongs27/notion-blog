import React from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { setIsMainDoor, setTag } from '@/stores/slice';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './postNav.module.scss';
import { Ipost } from '@/types/index';

interface IPostNav {
  post: Ipost;
  nav: string[];
}

export default function PostNav({ post, nav }: IPostNav) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    const { tag } = e.currentTarget.dataset;
    dispatch(setTag(tag!));
    dispatch(setIsMainDoor(false));
    router.push('/');
  }

  return (
    <div className={styles.notionFooter}>
      {post.tags && (
        <ul className={styles.tags}>
          <span>태그 :</span>
          {post.tags.map(({ id, name, color }) => (
            <li key={id}>
              <button type="button" data-tag={name} onClick={handleClick} style={{ color }}>
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.navigation}>
        {nav[post.order! - 2] && <Link href={`/posts/${nav[post.order! - 2]}`}>이전 게시물</Link>}

        {nav[post.order!] && <Link href={`/posts/${nav[post.order!]}`}>다음 게시물</Link>}
      </div>
    </div>
  );
}
