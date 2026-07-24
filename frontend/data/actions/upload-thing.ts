"use server";

import { UTApi } from "uploadthing/server";
import { toDomainError } from "../errors/domain.error";

const utapi = new UTApi();

export const deleteImage = async (imgUrl: string) => {
  try {
    const fileKey = imgUrl.split("/").pop();

    if (!fileKey) throw toDomainError("Invalid image url");

    const res = await utapi.deleteFiles(fileKey);

    if (!res.success) throw toDomainError("Failed to delete image");

    return {
      success: true,
      message: "Image deleted successfully",
    };
  } catch (error) {
    throw toDomainError(error);
  }
};
