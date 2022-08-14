import styles from "./nav.module.scss";
import SearchIcon from "@/assets/search.svg";
import MenuIcon from "@/assets/menu.svg";

import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { changeSearchInput, setIsMainDoor } from "@/stores/slice";
import { useEffect, useState } from "react";
import cx from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import classNames from "classnames";

export default function Nav() {
  const [isScroll, setIsScroll] = useState(false);
  const [clickedMenu, setClickedMenu] = useState(false);
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(changeSearchInput(e.currentTarget.value));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("SSR로 검색기능 구현중입니다");
    // dispatch(changeSearchInput());
  }

  function handleClick(isMainDoor: boolean) {
    dispatch(setIsMainDoor(isMainDoor));
    router.push("/");
  }

  function handleMenu() {
    setClickedMenu((prev) => !prev);
  }

  //observeAPI로 바꿔보기
  useEffect(() => {
    const debounce = () =>
      setTimeout(() => {
        window.scrollY !== 0 ? setIsScroll(true) : setIsScroll(false);
      }, 200);

    window.addEventListener("scroll", debounce);

    return () => {
      window.removeEventListener("scroll", debounce);
    };
  }, []);

  return (
    <div className={cx(styles.container, { [styles.transNav]: isScroll })}>
      <div className={styles.title}>
        <button type="button" onClick={() => handleClick(true)}>
          <Image
            src="/favicon.ico"
            alt="hongs blog"
            width={40}
            height={40}
            layout="fixed"
          />
          <span>ongs Blog</span>
        </button>
      </div>

      <div className={styles.search}>
        <form onSubmit={handleSubmit}>
          <SearchIcon />
          <input type="text" value={search} onChange={handleChange} />
        </form>
      </div>

      <ul
        className={classNames(styles.category, {
          [styles.responsiveCategory]: clickedMenu === true,
        })}
      >
        <li>
          <button type="button" onClick={() => handleClick(false)}>
            Blog
          </button>
        </li>
        <li>
          <Link href="/works">Works</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      <button className={styles.menuIcon} type="button" onClick={handleMenu}>
        <MenuIcon />
      </button>
    </div>
  );
}
