import { InitialPage } from '../types';

import { getPostsAndTags } from '@/lib';
import Posts from '@/components/Posts';

export default function Works({ tags, posts }: InitialPage) {
  return <Posts tags={tags} posts={posts} />;
}

export async function getStaticProps() {
  const notionDatabaseID = process.env.NOTION_PROJECTS_DATABASE;
  const { tags, posts } = await getPostsAndTags(notionDatabaseID!);

  return {
    props: {
      tags,
      posts,
    },
    revalidate: 10,
  };
}
