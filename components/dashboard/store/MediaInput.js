"use client";

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "@/utils/uploadthing";

import { useCallback, useEffect, useState } from "react";

import classes from "./MediaInput.module.css";

import MediaInputImage from "./MediaInputImage";

const MediaInput = ({ files, setFiles, permittedFileInfo, productId }) => {
  ///////  uploadthing tingzz //////

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  let buttonText = files.length > 0 ? "Change" : "Upload new";

  const imageSrcHandler = (file) => {
    if (typeof file == "object") {
      return {
        src: URL.createObjectURL(file),
        key: file.name,
      };
    } else {
      return {
        src: file,
        key: file,
      };
    }
  };

  return (
    <div className={classes.container}>
      {files.map((file) => (
        <MediaInputImage
          key={imageSrcHandler(file).key}
          imageSrcHandler={imageSrcHandler}
          setFiles={setFiles}
          productId={productId}
          file={file}
        />
      ))}

      <div {...getRootProps()}>
        <input onChange={() => console.log("files")} {...getInputProps()} />
        <p className={classes.mediaLabel}>{buttonText}</p>
      </div>
    </div>
  );
};

export default MediaInput;
