import * as NotionClient from './notion-client';
import NotionAPI from './notion-api';
import { Ititle } from '../types';

export type MultiSelectType = {
  type: 'multi_select';
  multi_select: {
    options: Array<{
      name: string;
      id?: string;
      color?: string;
    }>;
  };
  id: string;
  name: string;
};

export type Tag = {
  id: string;
  name: string;
  color?: string;
};

export type Post = {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  createdTime: string;
};

export async function getPostsAndTags(postsDataId: string) {
  // https://developers.notion.com/reference/post-database-query

  const [tagsDatabase, postsDatabase]: any = await Promise.all([
    NotionClient.retrieveDatabase(postsDataId),
    NotionClient.queryDatabase({
      database_id: postsDataId,
      filter: {
        property: 'Name',
        title: {
          is_not_empty: true,
        },
      },
      sorts: [
        {
          property: 'Order',
          direction: 'descending',
        },
      ],
    }),
  ]);

  // THINK-GYU
  // 복잡한 데이터 형태인 경우 api response 형태를 어떻게 mock 해야하는지??

  // parse tags
  const tags = tagsDatabase.properties.Tags.multi_select.options;

  // parse posts
  const postsIDs = postsDatabase.results.map((post) => ({
    postId: post.id,
    tagId: post.properties.Tags.id,
    nameId: post.properties.Name.id,
    descriptionId: post.properties.Description.id,
    thumbnailId: post.properties.Thumbnail.id,
    linkId: post.properties.Link?.id,
    createdTime: new Date(post.created_time).toLocaleDateString(),
  }));

  const posts = await Promise.all(
    postsIDs.map((post) =>
      Promise.all([
        NotionClient.getDetail(post.postId, post.tagId),
        NotionClient.getDetail(post.postId, post.nameId),
        NotionClient.getDetail(post.postId, post.descriptionId),
        NotionClient.getDetail(post.postId, post.thumbnailId),
        NotionClient.getDetail(post.postId, post.linkId),
      ])
        .then(([tags, name, description, thumbnailURL, link]) => ({
          postId: post.postId,
          tags: tags.multi_select,
          title: name.results[0].title.plain_text,
          description: description.results[0]?.rich_text.plain_text || '',
          thumbnail: thumbnailURL.results[0]?.rich_text.plain_text.split(/#/g)[1] || '',
          link: link.results[0]?.rich_text.plain_text || '',
          createdTime: post.createdTime,
        }))
        .then(async (result) => {
          if (!result.thumbnail) return result;

          const thumbnail = await NotionClient.getImage(result.thumbnail);
          return {
            ...result,
            thumbnail: thumbnail.image.file.url,
          };
        }),
    ),
  );

  return {
    tags,
    posts,
  };
}

export async function getPostsPath(rootPostId: string) {
  const postsDatabase = await NotionClient.queryDatabase({
    database_id: rootPostId,
    filter: {
      property: 'Name',
      title: {
        is_not_empty: true,
      },
    },
    sorts: [
      {
        property: 'Order',
        direction: 'descending',
      },
    ],
  });

  // parse posts
  const postsIDs = postsDatabase.results.map((post) => ({
    postId: post.id,
    tagId: post.properties.Tags.id,
    nameId: post.properties.Name.id,
    descriptionId: post.properties.Description.id,
    thumbnailId: post.properties.Thumbnail.id,
    createdTime: new Date(post.created_time).toLocaleDateString(),
  }));

  const posts = await Promise.all(
    postsIDs.map((post) =>
      Promise.all([
        NotionClient.getDetail(post.postId, post.tagId),
        NotionClient.getDetail(post.postId, post.nameId),
        NotionClient.getDetail(post.postId, post.descriptionId),
        NotionClient.getDetail(post.postId, post.thumbnailId),
      ]).then(([tags, name, description, thumbnail]) => ({
        postId: post.postId,
        tags: tags.multi_select,
        title: name.results[0].title.plain_text,
        description: description.results[0]?.rich_text.plain_text || '',
        thumbnail,
        createdTime: post.createdTime,
      })),
    ),
  );

  return posts;
}

export async function getDetailPost(postId: string) {
  const [recordMap, post]: any = await Promise.all([NotionAPI.getPage(postId), NotionClient.getPage(postId)]);

  const parsedPost = {
    postId: post.id,
    orderId: post.properties.Order.id,
    tagId: post.properties.Tags.id,
    nameId: post.properties.Name.id,
    descriptionId: post.properties.Description.id,
    thumbnailId: post.properties.Thumbnail.id,
    createdTime: new Date(post.created_time).toLocaleDateString(),
  };

  const [orderDetail, tagDetail, nameDetail, descriptionDetail, thumbnailDetail] = await Promise.all([
    NotionClient.getDetail(postId, parsedPost.orderId),
    NotionClient.getDetail(postId, parsedPost.tagId),
    NotionClient.getDetail(postId, parsedPost.nameId),
    NotionClient.getDetail(postId, parsedPost.descriptionId),
    NotionClient.getDetail(postId, parsedPost.thumbnailId),
  ]);

  const resultPost = {
    postId: parsedPost.postId,
    order: orderDetail.number,
    tags: tagDetail.multi_select,
    title: nameDetail.results[0].title.plain_text,
    description: descriptionDetail.results[0]?.rich_text.plain_text || '',
    thumbnail: thumbnailDetail,
    createdTime: parsedPost.createdTime,
  };

  return {
    recordMap,
    resultPost,
  };
}

export async function getResume(postId: string) {
  const resume = await NotionAPI.getPage(postId);

  return resume;
}

export async function searchPage(title: string) {
  const searchedPages = await NotionClient.searchPage({
    query: title,
    sort: {
      direction: 'ascending',
      timestamp: 'last_edited_time',
    },
    filter: {
      property: 'object',
      value: 'page',
    },
  });

  const postsExceptResume = [];
  searchedPages.results.forEach((post) => {
    if (post.id === 'd32aca24-07a0-4540-9e4e-1df417678ecc') return;

    postsExceptResume.push({
      postId: post.id,
      tagId: post.properties.Tags.id,
      nameId: post.properties.Name.id,
      descriptionId: post.properties.Description.id,
      thumbnailId: post.properties.Thumbnail.id,
      linkId: post.properties.Link?.id,
      createdTime: new Date(post.created_time).toLocaleDateString(),
    });
  });

  const posts = await Promise.all(
    postsExceptResume.map((post) =>
      Promise.all([
        NotionClient.getDetail(post.postId, post.tagId),
        NotionClient.getDetail(post.postId, post.nameId),
        NotionClient.getDetail(post.postId, post.descriptionId),
        NotionClient.getDetail(post.postId, post.thumbnailId),
        NotionClient.getDetail(post.postId, post.linkId),
      ])
        .then(([tags, name, description, thumbnailURL, link]) => ({
          postId: post.postId,
          tags: tags.multi_select,
          title: name.results[0]?.title.plain_text,
          description: description.results[0]?.rich_text.plain_text || '',
          thumbnail: thumbnailURL.results[0]?.rich_text.plain_text.split(/#/g)[1] || '',
          link: link.results[0]?.rich_text.plain_text || '',
          createdTime: post.createdTime,
        }))
        .then(async (result) => {
          if (!result.thumbnail) return result;

          const thumbnail = await NotionClient.getImage(result.thumbnail);
          return {
            ...result,
            thumbnail: thumbnail.image.file.url,
          };
        }),
    ),
  );

  return posts;
}
