import { useCallback, useState } from "react";

// import Image from "next/image";
import Image from "@/hooks/Image";

import styles from "./posts.module.scss";
import PageNation from "./PageNation";
import { useRouter } from "next/router";

export default function Posts({ posts = [] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  //pagenation => class로 바꿔보기
  const PER_PAGE_COUNT = 6;
  const offset = (currentPage - 1) * PER_PAGE_COUNT;
  const totalPage = Math.ceil(posts.length / PER_PAGE_COUNT);

  const handleClick = (postId, link) => {
    if (router.pathname === "/works") {
      return window.open(`${link}`, "_blank");
    }

    return router.push({
      pathname: `/posts/[id]`,
      query: { id: postId },
    });
  };

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

  return (
    <>
      <ul className={styles.postList}>
        {posts.length ? (
          posts
            .slice(offset, offset + PER_PAGE_COUNT)
            .map(
              ({
                postId,
                title,
                tags,
                description,
                thumbnail,
                createdTime,
                link,
              }) => (
                <li key={postId}>
                  <button
                    type="button"
                    onClick={() => handleClick(postId, link)}
                  >
                    <div className={styles.imageWrapper}>
                      <Image
                        src={thumbnail}
                        alt="썸네일"
                        width={250}
                        height={120}
                      />
                    </div>

                    <h2>{title}</h2>
                    <div className={styles.postMeta}>
                      <div className={styles.metaTags}>
                        {tags.map(({ name, color }) => (
                          <span key={name} style={{ color: color }}>
                            #{name}
                          </span>
                        ))}
                      </div>
                      <div className={styles.metaETC}>
                        <span> 홍원배 </span>
                        <span>{createdTime}</span>
                      </div>
                    </div>
                    <p className={styles.postContents}>
                      {description?.length > 80
                        ? `${description.slice(0, 80)}...`
                        : description}
                    </p>
                  </button>
                </li>
              )
            )
        ) : (
          <p>해당 포스팅이 없습니다</p>
        )}
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
