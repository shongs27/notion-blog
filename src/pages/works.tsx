import { getPostsAndTags } from '@/lib';

import PostList from '@/components/PostList';
import { InitialPage } from '../types';

export default function Works({ tags, posts }: InitialPage) {
  return <PostList tags={tags} posts={posts} />;
}

export async function getStaticProps() {
  const notionDatabaseID = process.env.NOTION_PROJECTS_DATABASE;
  const { tags, posts } = await getPostsAndTags(notionDatabaseID!);

  return {
    props: {
      tags,
      posts,
    },
  };
}
