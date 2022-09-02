import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { changeSearchInput, setIsMainDoor, setTag } from '@/stores/slice';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from './nav.module.scss';

import cx from 'classnames';
import { SearchIcon } from '@/assets';
import { MenuIcon } from '@/assets';

export default function Nav() {
  const [isScroll, setIsScroll] = useState(false);
  const [clickedMobileMenu, setClickedMobileMenu] = useState(false);
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(changeSearchInput(e.currentTarget.value));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (/^.{0,1}$/.test(search)) {
      return window.alert('두 글자 이상의 타이틀로 검색해주세요');
    }

    dispatch(setTag('전체'));
    router.push(`/search?title=${search}`);
  }

  function handleMainDoor(isMainDoor: boolean) {
    dispatch(setIsMainDoor(isMainDoor));
    router.push('/');
  }

  function handleMobileMenu() {
    setClickedMobileMenu((prev) => !prev);
  }

  function handleRouting(params: string) {
    dispatch(setTag('전체'));

    if (params === 'blog') {
      handleMainDoor(false);
      return router.push('/');
    }
    router.push(`/${params}`);
  }

  useEffect(() => {
    let timer: null | ReturnType<typeof setTimeout>;

    const throttling = () => {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          window.scrollY > 180 ? setIsScroll(true) : setIsScroll(false);
        }, 200);
      }
    };

    window.addEventListener('scroll', throttling);
    return () => {
      window.removeEventListener('scroll', throttling);
    };
  }, []);

  return (
    <div className={styles.stickyWrpper}>
      <div className={cx(styles.container, { [styles.transNav]: isScroll })}>
        <div className={styles.container}>
          <div className={styles.title}>
            <button type="button" onClick={() => handleMainDoor(true)}>
              <Image src="/favicon.ico" alt="hongs blog" width={40} height={40} />
              <span>ongs Blog</span>
            </button>
          </div>

          <div className={styles.search}>
            <form onSubmit={handleSubmit}>
              <SearchIcon onClick={handleSubmit} />
              <input type="text" value={search} onChange={handleChange} placeholder="타이틀로 검색하세요" />
            </form>
          </div>

          <ul
            className={cx(styles.category, {
              [styles.responsiveCategory]: clickedMobileMenu === true,
            })}
          >
            {['blog', 'works', 'about', 'contact'].map((menu) => (
              <li key={menu}>
                <button type="button" onClick={() => handleRouting(menu)}>
                  {menu.charAt(0).toUpperCase() + menu.slice(1)}
                </button>
              </li>
            ))}
          </ul>

          <button className={styles.menuIcon} type="button" onClick={handleMobileMenu}>
            <MenuIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
