import { useAppSelector } from "@/hooks/redux";

import styles from "./postsList.module.scss";

import Posts from "./Posts";
import Tags from "./Tags";

export default function PostList({ posts, tags }) {
  const selectedTag = useAppSelector((state) => state.selectedTag);

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
      <Posts posts={posts} />
    </div>
  );
}
