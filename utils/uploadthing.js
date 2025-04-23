import { generateReactHelpers } from "@uploadthing/react";
import { generateUploadButton } from "@uploadthing/react";
import { generateUploadDropzone } from "@uploadthing/react";
import { generateUploader } from "@uploadthing/react";

export const { useUploadThing, uploadFiles } = generateReactHelpers();

// export const { UploadButton, UploadDropzone, Uploader } = generateComponents();

export const UploadButton = generateUploadButton();
export const UploadDropzone = generateUploadDropzone();
export const Uploader = generateUploader();
