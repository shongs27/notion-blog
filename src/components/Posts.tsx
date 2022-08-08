import Link from "next/link";
import Image from "next/image";

import styles from "./postsList.module.scss";

interface Iposts {
  posts: [];
  offset: number;
  PER_PAGE_COUNT: number;
}

export default function Posts({ posts = [], offset, PER_PAGE_COUNT }: Iposts) {
  // pagePosts === 포스트 리스트들
  // pageTags === 각 카테고리 개수
  // pageTotaltags === 총 카테고리 개수

  console.log(posts);
  if (!posts.length) {
    return (
      <div style={{ backgroundColor: "black", color: "white" }}>
        해당 포스팅이 없습니다
      </div>
    );
  }

  return (
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
  );
}
