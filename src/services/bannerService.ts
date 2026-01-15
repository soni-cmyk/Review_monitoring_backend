import Banner from "../models/BannerModel.js";

/* ===============================
   CREATE
================================ */
export const createBannerService = async (data: any) => {
  return await Banner.create(data);
};

/* ===============================
   READ
================================ */
export const getAllBannersService = async () => {
  return await Banner.find().sort({ createdAt: -1 });
};

/* ===============================
   DELETE
================================ */
export const deleteBannerService = async (id: string) => {
  return await Banner.findByIdAndDelete(id);
};

/* ===============================
   TOGGLE STATUS
================================ */
export const toggleBannerStatusService = async (id: string) => {
  const banner = await Banner.findById(id);
  if (!banner) return null;

  banner.isActive = !banner.isActive;
  await banner.save();
  return banner;
};

/* ===============================
   UPDATE
================================ */
export const updateBannerService = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    link?: string;
    buttonText?: string;
    buttonLink?: string;
    isActive?: boolean;
    image?: string;
  }
) => {
  const banner = await Banner.findById(id);
  if (!banner) {
    throw new Error("Banner not found");
  }

  // Update only provided fields
  if (data.title !== undefined) banner.title = data.title;
  if (data.description !== undefined) banner.description = data.description;
  if (data.link !== undefined) banner.link = data.link;
  if (data.buttonText !== undefined) banner.buttonText = data.buttonText;
  if (data.buttonLink !== undefined) banner.buttonLink = data.buttonLink;
  if (data.isActive !== undefined) banner.isActive = data.isActive;

  //  Cloudinary image URL
  if (data.image) {
    banner.imageUrl = data.image;
  }

  await banner.save();
  return banner;
};
