import Logo from "../models/LogoModel.js";

/* ===============================
   CREATE
================================ */
export const createLogoService = async (data: {
  link?: string;
  logoUrl: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoFileName?: string;
  logoMimeType?: string;
  logoSize?: number;
  logoPublicId?: string;
  isActive?: boolean;
}) => {
  return await Logo.create(data);
};

/* ===============================
   READ
================================ */
export const getAllLogosService = async () => {
  return await Logo.find().sort({ createdAt: -1 });
};

/* ===============================
   DELETE
================================ */
export const deleteLogoService = async (id: string) => {
  return await Logo.findByIdAndDelete(id);
};

/* ===============================
   TOGGLE STATUS
================================ */
export const toggleLogoStatusService = async (id: string) => {
  const logo = await Logo.findById(id);
  if (!logo) {
    throw new Error("Logo not found");
  }

  logo.isActive = !logo.isActive;
  await logo.save();

  return logo;
};

/* ===============================
   UPDATE
================================ */
export const updateLogoService = async (
  id: string,
  data: {
    link?: string;
    logoAlt?: string;
    logoWidth?: number;
    logoHeight?: number;
    logoPublicId?: string;
    isActive?: boolean;
  },
  file?: Express.Multer.File
) => {
  const updateData: any = {
    link: data.link,
    logoAlt: data.logoAlt,
    logoWidth: data.logoWidth,
    logoHeight: data.logoHeight,
    logoPublicId: data.logoPublicId,
    isActive: data.isActive,
  };
   
  // If a new logo file is uploaded, update logo-related fields
  if (file) {
    updateData.logoUrl = file.path;;
    updateData.logoFileName = file.originalname;
    updateData.logoMimeType = file.mimetype;
    updateData.logoSize = file.size;
  }

  const logo = await Logo.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!logo) {
    throw new Error("Logo not found");
  }

  return logo;
};
