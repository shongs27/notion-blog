import styles from "./nav.module.scss";
import SearchIcon from "@/assets/search.svg";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { changeSearchInput, setClickedBlog } from "@/stores/slice";
import { useEffect, useState } from "react";
import cx from "classnames";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const [isScroll, setIsScroll] = useState(false);
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(changeSearchInput(e.currentTarget.value));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    alert("아직 검색을 위한 백엔드 서버가 미구현 입니다 (┬┬﹏┬┬)");
    dispatch(changeSearchInput(""));
  }

  function handleClick() {
    dispatch(setClickedBlog(true));
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
      <div className={styles.nav}>
        <div className={styles.title}>
          <Link href="/">
            <a>
              <Image
                src="/favicon.ico"
                alt="hongs blog"
                width={40}
                height={40}
              />
              <span>ongs Blog</span>
            </a>
          </Link>
        </div>

        <div className={styles.search}>
          <form onSubmit={handleSubmit}>
            <SearchIcon />
            <input type="text" value={search} onChange={handleChange} />
          </form>
        </div>

        <ul className={styles.category}>
          <li>
            <button onClick={handleClick}>Blog</button>
          </li>
          <li>
            <a href="mortyGame/index.html" target="_blank">
              Works
            </a>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
