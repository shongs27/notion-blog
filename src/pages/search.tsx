import { searchPage } from '@/lib';
import { Ipost } from '../types';

import PostList from '@/components/PostList';
import { GetServerSideProps } from 'next';

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
