import React, { useState } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useUploadThing } from "@/utils/uploadthing";
import MediaInput from "./MediaInput";

import classes from "../categories/CategoriesList.module.css";
import { toggleBanner } from "@/lib/banner";
import { useDispatch } from "react-redux";

const HeroForm = ({ close, refetch, item, type }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

  const [header, setHeader] = useState(item?.header || "");
  const [subheader, setSubheader] = useState(item?.subheader || "");

  const [submitLoading, setSubmitLoading] = useState(false);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadError: () => {
      toggleBanner(dispatch, "Error occured please try again", "red");
    },
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    switch (type) {
      case "add":
        try {
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
            }),
            headers: {
              "content-Type": "application/json",
            },
          });
          toggleBanner(dispatch, "Store updated successfully", "ok");

          // refetch();
        } catch (e) {
          console.log(e);
          toggleBanner(dispatch, "Error please try again", "error");
          setSubmitLoading(false);
        }

        break;
      case "edit":
        try {
          let imageUrl;
          if (typeof files[0] === "object") {
            const uploadedImages = await startUpload(files);

            imageUrl = uploadedImages[0].url;
          } else {
            imageUrl = item.imageUrl;
          }

          const res = await fetch("/api/store", {
            method: "PUT",
            body: JSON.stringify({
              imageUrl,
              header,
              subheader,
              type: "hero",
              id: item._id,
            }),
            headers: {
              "content-Type": "application/json",
            },
          });
          toggleBanner(dispatch, "Store updated successfully", "ok");

          refetch();
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

      <MediaInput
        files={files}
        setFiles={setFiles}
        defaultImage={item?.imageUrl}
      />
      <button type="submit" className={classes.button}>
        {submitLoading ? (
          <LoadingSpinner size={16} />
        ) : type === "add" ? (
          "Add"
        ) : (
          "Edit"
        )}
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
