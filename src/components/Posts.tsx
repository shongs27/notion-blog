import { useCallback, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import styles from "./posts.module.scss";
import PageNation from "./PageNation";

export default function Posts({ posts = [] }) {
  const [currentPage, setCurrentPage] = useState(1);

  //pagenation => class로 바꿔보기
  const PER_PAGE_COUNT = 6;
  const offset = (currentPage - 1) * PER_PAGE_COUNT;
  const totalPage = Math.ceil(posts.length / PER_PAGE_COUNT);

  const handlePage = useCallback(
    (move: string | undefined) => {
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

  if (!posts.length) {
    return (
      <div style={{ backgroundColor: "black", color: "white" }}>
        해당 포스팅이 없습니다
      </div>
    );
  }

  return (
    <>
      <ul className={styles.postList}>
        {posts
          .slice(offset, offset + PER_PAGE_COUNT)
          .map(({ postId, title, tags, description, createdTime }) => (
            <li key={postId}>
              <Link
                href={{
                  pathname: `/posts/[id]`,
                  query: { id: postId },
                }}
              >
                <a>
                  <div className={styles.imagePosition}>
                    <Image
                      src="http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
                      alt="공사중"
                      width={200}
                      height={200}
                    />
                  </div>

                  <h2>{title}</h2>
                  <p className={styles.postMeta}>
                    <span> 홍원배 </span>
                    <span> | </span> <span>{createdTime}</span>
                    <span>
                      {tags.map(({ name }) => (
                        <span key={name}>{name}</span>
                      ))}
                    </span>
                  </p>
                  <p className={styles.postContents}>
                    {description.length > 85
                      ? `${description.slice(0, 85)}...`
                      : description}
                  </p>
                </a>
              </Link>
            </li>
          ))}
      </ul>

      <div className={styles.pageNationContainer}>
        <PageNation
          currentPage={currentPage}
          totalPage={totalPage}
          handlePage={handlePage}
        />
      </div>
    </>
  );
}
