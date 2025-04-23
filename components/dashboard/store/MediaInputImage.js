import CloseX from "@/svgs/CloseX";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./MediaInputImage.module.css";
import { useState } from "react";

const MediaInputImage = ({ imageSrcHandler, file, setFiles, productId }) => {
  const [loading, setLoading] = useState(false);

  /////////// api handler delete image from uploadthing //////

  const deleteUtImage = async (name) => {
    try {
      const response = await fetch(`/api/uploadthing/deleteImage`, {
        method: "DELETE",
        body: JSON.stringify({ name, productId }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  /////////// delete image from db and ut ////////////////

  const deleteImageHandler = async (file, event) => {
    if (typeof file == "object") {
      event.stopPropagation();
      setFiles((prev) => prev.filter((item) => item.name !== file.name));
    } else {
      setLoading(true);
      await deleteUtImage(file);
      setFiles((prev) => prev.filter((item) => item !== file));
      setLoading(false);
    }
  };
  //////////////////////////////////////////////////

  return (
    <div key={imageSrcHandler(file).key} className={classes.imageContainer}>
      <img
        className={classes.image}
        key={file.path}
        src={imageSrcHandler(file).src}
        alt=""
      />
    </div>
  );
};

export default MediaInputImage;
