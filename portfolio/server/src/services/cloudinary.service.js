const cloudinary = require("../config/cloudinary");

/**
 * Delete an image from Cloudinary by its public_id
 * Safe to call even if publicId is null/undefined
 * @param {string|null} publicId
 */
const deleteImage = async (publicId) => {
  if (!publicId) return null;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    return null;
  }
};

module.exports = { deleteImage };
