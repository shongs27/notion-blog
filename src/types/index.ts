export interface LayoutProps {
  children: React.ReactNode;
}

export type Tag = {
  id?: string;
  name?: string;
  color?: string;
};

export type Post = {
  postId: string;
  title: string;
  description: string;
  tags: Tag[];
  createdTime: string;
  thumbnail?: string;
};

export interface InitialPage {
  tags: Tag[];
  posts: Post[];
}
