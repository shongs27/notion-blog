import * as NotionClient from "./notion-client";
import NotionAPI from "./notion-api";

export type MultiSelectType = {
  type: "multi_select";
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
        property: "Name",
        title: {
          is_not_empty: true,
        },
      },
      sorts: [
        {
          property: "Order",
          direction: "descending",
        },
      ],
    }),
  ]);

  // THINK-GYU
  // 복잡한 데이터 형태인 경우 api response 형태를 어떻게 mock 해야하는지??

  // parse Tags
  // const tags = (tagsDatabase.properties.tags as MultiSelectType).multi_select
  //   .options;
  const tags = tagsDatabase.properties.Tags.multi_select.options;

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
        description: description.results[0]?.rich_text.plain_text || "",
        thumbnail,
        createdTime: post.createdTime,
      }))
    )
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
      property: "Name",
      title: {
        is_not_empty: true,
      },
    },
    sorts: [
      {
        property: "Order",
        direction: "descending",
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
        description: description.results[0]?.rich_text.plain_text || "",
        thumbnail,
        createdTime: post.createdTime,
      }))
    )
  );

  return posts;
}

export async function getDetailPost(postId: string) {
  // const [recordMap, postPage]: any = await Promise.all([
  //   NotionAPI.getPage(postId),
  //   NotionClient.getPage(postId),
  // ]);

  const recordMap = await NotionAPI.getPage(
    "be813c5f-369e-4572-ae03-9403df3631f5"
  );

  return {
    recordMap,
  };
}
