import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setClickedBlog, setTag } from "@/stores/slice";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./postNav.module.scss";

export default function PostNav({ post }) {
  const dispatch = useAppDispatch();
  const postsIDs = useAppSelector((state) => state.postsIDs);
  const router = useRouter();

  function handleClick(e) {
    const { tag } = e.currentTarget.dataset;
    dispatch(setTag(tag));
    dispatch(setClickedBlog(true));
    router.push("/");
  }

  return (
    <div className={styles.notionFooter}>
      {post.tags && (
        <ul className={styles.tags}>
          <span>태그 :</span>
          {post.tags.map(({ id, name, color }) => (
            <li key={id}>
              <button type="button" data-tag={name} onClick={handleClick}>
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.navigation}>
        {postsIDs[post.order - 2] && (
          <Link href={`/posts/${postsIDs[post.order - 2]}`}>이전 게시물</Link>
        )}

        {postsIDs[post.order] && (
          <Link
            className={styles.nextLink}
            href={`/posts/${postsIDs[post.order]}`}
          >
            다음 게시물
          </Link>
        )}
      </div>
    </div>
  );
}
