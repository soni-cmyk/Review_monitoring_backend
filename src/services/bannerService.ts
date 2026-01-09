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
