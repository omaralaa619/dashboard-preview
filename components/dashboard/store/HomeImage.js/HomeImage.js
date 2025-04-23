import { useState } from "react";
import Card from "../../UI/Card";
import MediaInput from "./MediaInput";
import classes from "./HomeImage.module.css";
import { useUploadThing } from "@/utils/uploadthing";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useRouter } from "next/navigation";

const Hero = ({ defaultImage, refetch }) => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadError: () => {
      toggleBanner(dispatch, "Error occured please try again", "red");
    },
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const uploadedImages = await startUpload(files);

      const imageUrl = uploadedImages[0].url;

      console.log("imageUrls", imageUrl);

      const res = await fetch("/api/store", {
        method: "PUT",
        body: JSON.stringify({
          imageUrl,
          defaultImage,

          type: "hero image",
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const response = await res.json();

      console.log(response);
      refetch();
    } catch (e) {
      console.log(e);
      //   toggleBanner(dispatch, e.message, "red");
      setSubmitLoading(false);
    }

    setSubmitLoading(false);
  };

  return (
    <form className={classes.main} onSubmit={submitHandler}>
      <Card className={classes.card}>
        <div className={classes.titleContainer}>
          <h3 className={classes.title}>Hero Image</h3>
        </div>

        <div className="p-[16px]">
          <MediaInput
            files={files}
            setFiles={setFiles}
            defaultImage={defaultImage}
          />
        </div>

        {files.length != 0 && (
          <button className={classes.button} type="submit">
            {!submitLoading && "Save"}{" "}
            {submitLoading && <LoadingSpinner size={16} />}
          </button>
        )}
      </Card>
    </form>
  );
};

export default Hero;
