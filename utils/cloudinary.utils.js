// Vendors
import { v2 as cloudinary } from "cloudinary";

export const deleteFile = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(file, { folder }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const deleteFiles = (files, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.api.delete_resources(files, { folder }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const uploadFile = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, { folder }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
