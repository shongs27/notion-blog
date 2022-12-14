export interface Itag {
  id: string;
  name: string;
  color: string;
}

export interface Ipost {
  postId: string;
  tags: Itag[];
  title: string;
  description: string;
  thumbnail?: string;
  link: string;
  createdTime: string;
  order?: number;
}

export interface InitialPage {
  posts: Ipost[];
  tags?: Itag[];
}

export interface ISelectors {
  id: string | undefined;
  title: string;
  level: number;
}
