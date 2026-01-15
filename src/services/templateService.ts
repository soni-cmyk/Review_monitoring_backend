import Page, { IPage } from "../models/TemplateModel.js";

export const upsertPageService = async (data: {
  title: string;
  slug: string;
  content: string;
}): Promise<IPage | null> => {
  const { title, slug, content } = data;

  const page = await Page.findOneAndUpdate(
    { slug },
    { title, slug, content },
    { upsert: true, new: true }
  );

  return page;
};

export const getPageBySlugService = async (
  slug: string
): Promise<IPage | null> => {
  return await Page.findOne({ slug });
};

export const getAllPagesService = async (): Promise<IPage[]> => {
  return await Page.find();
};

export const deletePageBySlugService = async (
  slug: string
): Promise<{ deletedCount?: number }> => {
  return await Page.deleteOne({ slug });
}