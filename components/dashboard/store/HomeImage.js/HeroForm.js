import React, { useState } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useUploadThing } from "@/utils/uploadthing";
import MediaInput from "./MediaInput";

import classes from "../categories/CategoriesList.module.css";
import { toggleBanner } from "@/lib/banner";
import { useDispatch } from "react-redux";

const HeroForm = ({ close, setStoreData, item, type }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

  const [header, setHeader] = useState(item?.header || "");
  const [subheader, setSubheader] = useState(item?.subheader || "");

  const [submitLoading, setSubmitLoading] = useState(false);

  const { startUpload, permittedFileInfo } = useUploadThing(
    files[0]?.type?.startsWith("video") ? "videoUploader" : "imageUploader",
    {
      onUploadError: () => {
        toggleBanner(dispatch, "Error occurred please try again", "red");
      },
    }
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    switch (type) {
      case "add":
        try {
          let mediaType = "image";
          const file = files[0];
          if (file?.type?.startsWith("video")) {
            mediaType = "video";
          }
          console.log("Uploaded file URL:", mediaType);
          const uploadedImages = await startUpload(files);

          const imageUrl = uploadedImages[0].url;

          console.log("imageUrls", imageUrl);

          const res = await fetch("/api/store", {
            method: "POST",
            body: JSON.stringify({
              imageUrl,
              header,
              subheader,
              type: "hero",
              mediaType,
            }),
            headers: {
              "content-Type": "application/json",
            },
          });
          const data = await res.json();
          setStoreData(data);
          close();
          toggleBanner(dispatch, "Store updated successfully", "ok");
        } catch (e) {
          console.log(e);
          toggleBanner(dispatch, "Error please try again", "error");
          setSubmitLoading(false);
        }

        break;
      case "edit":
        try {
          let imageUrl;
          let mediaType;
          if (typeof files[0] === "object") {
            const uploadedImages = await startUpload(files);
            if (files[0]?.type?.startsWith("video")) {
              mediaType = "video";
            }

            imageUrl = uploadedImages[0].url;
          } else {
            imageUrl = item.imageUrl;
            mediaType = item.mediaType;
          }

          const res = await fetch("/api/store", {
            method: "PUT",
            body: JSON.stringify({
              imageUrl,
              header,
              subheader,
              type: "hero",
              mediaType,
              id: item._id,
            }),
            headers: {
              "content-Type": "application/json",
            },
          });
          const data = await res.json();
          setStoreData(data);
          close();
          toggleBanner(dispatch, "Store updated successfully", "ok");
        } catch (e) {
          console.log(e);
          toggleBanner(dispatch, "Error please try again", "error");
          setSubmitLoading(false);
        }

        break;
    }

    setSubmitLoading(false);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <MediaInput
        files={files}
        setFiles={setFiles}
        defaultImage={item?.imageUrl}
        mediaType={item?.mediaType}
      />
      <label>Header</label>
      <input
        type="text"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
        className="mb-4"
      />

      <label>Subheader</label>
      <input
        type="text"
        value={subheader}
        onChange={(e) => setSubheader(e.target.value)}
        className="mb-4"
      />

      <button type="submit" className={classes.button}>
        {submitLoading ? <LoadingSpinner size={16} /> : <p>Save</p>}
      </button>

      <button
        type="button"
        className={`${classes.button} ${classes.cancel}`}
        onClick={close}
      >
        Cancel
      </button>
    </form>
  );
};

export default HeroForm;
