import { Client } from "@notionhq/client";
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

const auth = "secret_PwZKXrfMNIwSBh8wvoPYAwaFJCYuDVyICmysd45dIIt";
const notion = new Client({
  // auth: process.env.NOTION_TOKEN,
  auth,
});

//auth를 추가로 보내는 경우가 있으면 쓴다
type WithAuth<P> = P & {
  auth?: string;
};

export const getDatabase = async (databaseId: string) => {
  const database = await notion.databases.retrieve({
    database_id: databaseId,
  });

  return database;
};

export const getDatabaseItem = async (queryData: QueryDatabaseParameters) => {
  const database = await notion.databases.query(queryData);

  return database;
};

export const getPage = async (pageId: string) => {
  const page = await notion.pages.retrieve({
    page_id: pageId,
  });

  return page;
};

export const getDetail = async (pageId: string, propertyId: string) => {
  const response = await notion.pages.properties.retrieve({
    page_id: pageId,
    property_id: propertyId,
  });
  return response;
};