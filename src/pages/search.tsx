import { Ipost } from '../types';
import { GetServerSideProps } from 'next';

import PostList from '@/components/PostList';
import { searchPage } from '@/lib';

interface Iposts {
  posts: Ipost[];
}

export default function Search({ posts }: Iposts) {
  return <PostList posts={posts} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { title } = context.query;

  if (typeof title !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const posts = await searchPage(title);

  return {
    props: {
      posts,
    },
  };
};
