import { getPostsAndTags } from "@/lib";

import PostList from "@/components/PostList";

export default function Works({ tags, posts }) {
  return <PostList tags={tags} posts={posts} />;
}

export async function getStaticProps() {
  const notionDatabaseID = process.env.NOTION_PROJECTS_DATABASE;
  const { tags, posts } = await getPostsAndTags(notionDatabaseID!);

  // await generateSiteMap(posts);

  return {
    props: {
      tags,
      posts,
    },
  };
}
