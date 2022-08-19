import { NotionAPI } from "notion-client";

const notion = new NotionAPI();

export default notion;

export const getPage = async (pageId: string) => {
  const recordMap = await notion.getPage(pageId);

  return recordMap;
};
