import { useCallback } from "react";
import { setCurrentPage } from "@/stores/slice";
// import PageNation from "./PageNation";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import styles from "./postsList.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

export default function PostsList() {
  //   const params = useRouter().tag;
  console.log(useRouter());
  //   const tag = params ? params[0].toUpperCase() + params.slice(1) : "BLOG";
  const tag = "Blog";

  const dispatch = useAppDispatch();
  const pagePosts = useAppSelector((state) => state.pagePosts);
  const pageTags = useAppSelector((state) => state.pageTags);
  const pageTotalTags = useAppSelector((state) => state.pageTotalTags);

  const page = useAppSelector((state) => state.currentPage);
  const PER_PAGE_COUNT = 6;
  const offset = (page - 1) * PER_PAGE_COUNT;
  const totalPage = Math.ceil(pagePosts.length / PER_PAGE_COUNT);

  // function handlePage(currentPage) {
  //   const pageType = {
  //     prev: dispatch(setCurrentPage(page - 1)),
  //     next: dispatch(setCurrentPage(page + 1)),
  //   }

  //   dispatch(pageType[currentPage] || setCurrentPage(Number(currentPage)))
  // }

  const handlePage = useCallback(
    (currentPage) => {
      const pageType = {
        prev: dispatch(setCurrentPage(page - 1)),
        next: dispatch(setCurrentPage(page + 1)),
      };

      dispatch(pageType[currentPage] || setCurrentPage(Number(currentPage)));
    },
    [dispatch, page]
  );

  if (!pagePosts.length) {
    return <div>해당 포스팅이 없습니다</div>;
  }

  return (
    <div className={styles.tagPosts}>
      <h1>
        <span className={styles.title}>{tag}</span>
        <span className={styles.titleCount}>{pageTotalTags}</span>
      </h1>

      {/* <p>{intro.intro}</p> */}
      <ul className={styles.category}>
        {pageTags.map(({ tag, count }) => (
          <li key={tag}>
            {/* <Link href={`/${tag}`}>{`${tag}(${count})`}</Link> */}
            <Link
              href={{
                pathname: "/posts/[tag]",
                query: { tag },
              }}
            >{`${tag}(${count})`}</Link>
          </li>
        ))}
      </ul>

      <ul className={styles.postList}>
        {pagePosts
          .slice(offset, offset + PER_PAGE_COUNT)
          .map(({ id, title, writer, date, tags, contents }) => {
            const slicedContents = `${contents.slice(0, 85)}...`;

            return (
              <li key={id}>
                <Link href={`/posts/${id}`}>
                  <>
                    <Image
                      src="http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
                      alt="공사중"
                      width={200}
                      height={200}
                    />
                    <h2>{title}</h2>
                    <p className={styles.postMeta}>
                      <span>{writer}</span>
                      <span> | </span> <span>{date}</span>
                    </p>
                    <p className={styles.postContents}>{slicedContents}</p>
                  </>
                </Link>
              </li>
            );
          })}
      </ul>

      <div className={styles.pageNationContainer}>
        {/* <PageNation page={page} totalPage={totalPage} handlePage={handlePage} /> */}
      </div>
    </div>
  );
}
