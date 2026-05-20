import { v2 as cloudinary } from "cloudinary";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";

const hasCloudinaryConfig = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
  );

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
};

const localImageUrl = (file) => {
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
};

export const uploadImage = catchAsync(async (req, res) => {
  const file = req.file;
  if (!file) throw new ApiError(400, "No file uploaded");

  if (hasCloudinaryConfig()) {
    configureCloudinary();
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "eventify",
      resource_type: "image",
      format: "auto",
      transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
    });

    return res.json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
      },
    });
  }

  // Fallback for local development / missing Cloudinary config.
  res.json({
    success: true,
    data: {
      url: localImageUrl(file),
      public_id: `local_${Date.now()}`,
    },
  });
});
