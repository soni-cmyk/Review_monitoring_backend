import Banner from "../models/BannerModel.js";

export const createBannerService = async (data: any) => {
  return await Banner.create(data);
};

export const getAllBannersService = async () => {
  return await Banner.find().sort({ createdAt: -1 });
};

export const deleteBannerService = async (id: string) => {
  return await Banner.findByIdAndDelete(id);
};

export const toggleBannerStatusService = async (id: string) => {
  const banner = await Banner.findById(id);
  if (!banner) return null;

  banner.isActive = !banner.isActive;
  await banner.save();
  return banner;
};

/* ===============================
   UPDATE BANNER
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
  },
  file?: Express.Multer.File
) => {
  const updateData: {
    title?: string;
    description?: string;
    link?: string;
    buttonText?: string;
    buttonLink?: string;
    isActive?: boolean;
    imageUrl?: string;
  } = {
    title: data.title,
    description: data.description,
    link: data.link,
    buttonText: data.buttonText,
    buttonLink: data.buttonLink,
    isActive: data.isActive,
  };

  // Update image only if new file uploaded
  if (file) {
    updateData.imageUrl = `/uploads/products/${file.filename}`;
  }
  const banner = await Banner.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!banner) {
    throw new Error("Banner not found");
  }
  return banner;
};
