import { useAppSelector } from "@/hooks/redux";
import PostList from "./PostList";

export default function PostListContainer({ posts, tags }) {
  const selectedTag = useAppSelector((state) => state.selectedTag);

  if (selectedTag !== "") {
    posts = posts.filter((post) =>
      post.tags.some((tag) => tag.name === selectedTag)
    );
  }

  return <PostList posts={posts} tags={tags} />;
}
