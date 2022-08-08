import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import styles from "./postsList.module.scss";

import Posts from "./Posts";
import PageNation from "./PageNation";
import Tags from "./Tags";

export default function PostList({ posts, tags }) {
  const [currentPage, setCurrentPage] = useState(1);

  const selectedTag = useAppSelector((state) => state.selectedTag);

  //pagenation
  const PER_PAGE_COUNT = 6;
  const offset = (currentPage - 1) * PER_PAGE_COUNT;
  const totalPage = Math.ceil(posts.length / PER_PAGE_COUNT);

  const handlePage = useCallback(
    (move: string | undefined) => {
      console.log("이준석", move, typeof move);
      if (move === "prev") {
        return setCurrentPage(currentPage - 1);
      }

      if (move === "next") {
        return setCurrentPage(currentPage + 1);
      }

      return setCurrentPage(Number(move));
    },
    [currentPage]
  );

  if (selectedTag !== "전체") {
    posts = posts.filter((post) =>
      post.tags.some((tag) => tag.name === selectedTag)
    );
  }

  return (
    <div className={styles.tagPosts}>
      <h1>
        <span className={styles.title}>{selectedTag}</span>
        <span className={styles.titleCount}>{posts.length}</span>
      </h1>
      <Tags tags={tags} />
      <Posts posts={posts} offset={offset} PER_PAGE_COUNT={PER_PAGE_COUNT} />

      <div className={styles.pageNationContainer}>
        <PageNation
          currentPage={currentPage}
          totalPage={totalPage}
          handlePage={handlePage}
        />
      </div>
    </div>
  );
}
