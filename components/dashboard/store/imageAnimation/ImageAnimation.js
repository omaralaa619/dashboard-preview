import React, { useRef, useState } from "react";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { Edit } from "lucide-react";
import classes from "../categories/CategoriesList.module.css";
import { useUploadThing } from "@/utils/uploadthing";
import { useDispatch } from "react-redux";
import { toggleBanner } from "@/lib/banner";

const ImageAnimation = ({ setStoreData, image }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadError: () => {
      toggleBanner(dispatch, "Error occured please try again", "error");
    },
  });

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadedImages = await startUpload([file]);
      const imageUrl = uploadedImages[0].url;

      const res = await fetch("/api/store", {
        method: "POST",
        body: JSON.stringify({
          content: imageUrl,
          type: "imageAnimation",
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = await res.json();
      setStoreData(data);
      toggleBanner(dispatch, "Store updated successfully", "ok");
      setLoading(false);
    } catch (e) {
      console.log(e);
      toggleBanner(dispatch, "Error please try again", "error");
      setLoading(false);
    }
  };

  return (
    <Card className={classes.card}>
      <div className={classes.titleContainer}>
        <h3 className={classes.title}>Image Animation</h3>
      </div>

      {/* Top right small block 1 */}
      <div className="p-4">
        <div className="rounded-xl bg-gray-400  relative overflow-hidden aspect-[16/9]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-neutral-600/50 p-2 rounded-md cursor-pointer">
            {loading && <LoadingSpinner size={20} dark={true} />}
            {!loading && <Edit size={20} onClick={handleEditClick} />}
          </div>

          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover   "
          />
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Card>
  );
};

export default ImageAnimation;
