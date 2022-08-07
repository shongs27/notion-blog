import { useCallback, useState } from "react";
import { setCurrentPage, setCategory, setTag } from "@/stores/slice";
import PageNation from "./PageNation";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import styles from "./postsList.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

export default function PostList({ tags, posts }) {
  console.log("PostsList :", tags, posts);
  const { pathname } = useRouter();
  const listTitle = pathname !== "/" ? pathname.slice(1) : "BLOG";

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();
  // pagePosts === 포스트 리스트들
  // pageTags === 각 카테고리 개수
  // pageTotaltags === 총 카테고리 개수

  //pagenation
  const PER_PAGE_COUNT = 6;
  const offset = (currentPage - 1) * PER_PAGE_COUNT;
  const totalPage = Math.ceil(posts.length / PER_PAGE_COUNT);

  const handlePage = useCallback(
    (move: string) => {
      if (move === "prev") {
        return setCurrentPage(currentPage - 1);
      }

      if (move === "next") {
        return setCurrentPage(currentPage + 1);
      }

      return setCurrentPage(currentPage);
    },
    [dispatch, currentPage]
  );

  const handleClick = (e) => {
    dispatch(setTag(e.currentTarget.textContent));
  };

  if (!posts.length) {
    return (
      <div style={{ backgroundColor: "black", color: "white" }}>
        해당 포스팅이 없습니다
      </div>
    );
  }

  return (
    <div className={styles.tagPosts}>
      <h1>
        <span className={styles.title}>{listTitle}</span>
        <span className={styles.titleCount}>{posts.length}</span>
      </h1>

      {/* <p>{intro.intro}</p> */}
      <ul className={styles.category}>
        {tags.map(({ name, color, count }) => (
          <li key={name}>
            <button type="button" onClick={handleClick} data-tag={name}>
              {name}
            </button>
          </li>
        ))}
      </ul>

      <ul className={styles.postList}>
        {posts
          .slice(offset, offset + PER_PAGE_COUNT)
          .map(({ id, name, tags, description, createdTime }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <>
                  <div className={styles.imagePosition}>
                    <Image
                      src="http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
                      alt="공사중"
                      width={200}
                      height={200}
                    />
                  </div>

                  <h2>{name}</h2>
                  <p className={styles.postMeta}>
                    <span> 홍원배 </span>
                    <span> | </span> <span>{createdTime}</span>
                    <span>
                      {tags.map(({ name }, i) => (
                        <span key={`${name}-${i}`}>{name}</span>
                      ))}
                    </span>
                  </p>
                  <p className={styles.postContents}>
                    {description.length > 85
                      ? `${description.slice(0, 85)}...`
                      : description}
                  </p>
                </>
              </Link>
            </li>
          ))}
      </ul>

      <div className={styles.pageNationContainer}>
        <PageNation
          page={currentPage}
          totalPage={totalPage}
          handlePage={handlePage}
        />
      </div>
    </div>
  );
}
