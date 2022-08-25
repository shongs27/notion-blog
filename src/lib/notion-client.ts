import { Client } from '@notionhq/client';
import { QueryDatabaseParameters, SearchParameters } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const retrieveDatabase = async (databaseId: string) => {
  const database = await notion.databases.retrieve({
    database_id: databaseId,
  });

  return database;
};

export const queryDatabase = async (queryData: QueryDatabaseParameters) => {
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

export const searchPage = async (queryData: SearchParameters) => {
  const results = await notion.search(queryData);
  return results;
};

export const getBlock = async (blockId: string) => {
  const imageBlock = await notion.blocks.retrieve({
    block_id: blockId,
  });

  return imageBlock;
};
