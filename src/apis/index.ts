import * as NotionClient from "./notion-client";
import NotionAPI from "./notion-api";
import { DefaultDeserializer } from "v8";
import { resolve } from "path";

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

export async function getDetailPost(postId: string) {
  const [recordMap, postPage]: any = await Promise.all([
    NotionAPI.getPage(postId),
    NotionClient.getPage(postId),
  ]);

  const post: Post = {
    id: postPage.id,
    title: postPage.properties.title.title[0]["plain_text"],
    tags: postPage.properties.tags["multi_select"],
    description: postPage.properties.description["rich_text"][0]["plain_text"],
    createdTime: new Date(postPage.created_time).toLocaleDateString(),
  };

  return {
    recordMap,
    post,
  };
}

export async function getPostsAndTags(postsDataId: string) {
  // https://developers.notion.com/reference/post-database-query

  const [tagsDatabase, postsDatabase]: any = await Promise.all([
    NotionClient.getDatabase(postsDataId),
    NotionClient.getDatabaseItem({
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
  console.log("tagsDatabase", tagsDatabase);
  console.log("postsDatabase", postsDatabase);

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
      ]).then(([tag, name, description, thumbnail]) => ({
        postId: post.postId,
        tag: tag.multi_select,
        name: name.results[0]?.title.plain_text,
        description: description.results[0]?.rich_text.plain_text,
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

export async function getPosts(rootPostId: string) {
  const postsDatabase = await NotionClient.getDatabaseItem({
    database_id: rootPostId,
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });

  // parse posts
  const posts = postsDatabase.results //
    .filter(
      (value: any) =>
        value.properties.title.title.length &&
        value.properties.description["rich_text"].length
    ) // 게시물이 있는 경우
    .map((value: any) => ({
      id: value.id,
      title: value.properties.title.title[0]["plain_text"],
      tags: value.properties.tags["multi_select"],
      description: value.properties.description["rich_text"][0]["plain_text"],
      createdTime: new Date(value.created_time).toLocaleDateString(),
    }));

  return posts;
}
