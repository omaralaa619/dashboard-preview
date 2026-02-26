import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Image uploader
  imageUploader: f({
    image: { maxFileSize: "5MB", maxFileCount: 10 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Image upload complete");
    console.log("file url", file.url);
    return { url: file.url };
  }),

  // Video uploader
  videoUploader: f({
    video: { maxFileSize: "100MB", maxFileCount: 2 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Video upload complete");
    console.log("video file url", file.url);
    return { url: file.url };
  }),
};
