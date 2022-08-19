import { searchPage } from "@/lib";

import PostList from "@/components/PostList";

export default function Search({ posts }) {
  if (typeof posts === "string") {
    window.alert(posts);
    posts = [];
  }

  return <PostList posts={posts} />;
}

export async function getServerSideProps(context) {
  const { title } = context.query;

  try {
    const posts = await searchPage(title);

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    return {
      props: {
        posts: error.message,
      },
    };
  }
}
