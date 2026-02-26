import React, { useRef, useState } from "react";
import Card from "../../UI/Card";
import classes from "../categories/CategoriesList.module.css";
import { Edit } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";
import { useDispatch } from "react-redux";
import { toggleBanner } from "@/lib/banner";
import LoadingSpinner from "../../UI/LoadingSpinner";

const ImageGallery = ({ images, setStoreData }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadError: () => {
      toggleBanner(dispatch, "Error occured please try again", "error");
    },
  });

  // index: which image to replace
  const handleEditClick = (index) => {
    if (fileInputRef.current) {
      fileInputRef.current.dataset.index = index;
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) return;
    const index = parseInt(e.target.dataset.index, 10);

    try {
      const uploadedImages = await startUpload([file]);

      const imageUrl = uploadedImages[0].url;

      const res = await fetch("/api/store", {
        method: "POST",
        body: JSON.stringify({
          index,
          imageUrl,
          type: "imageGallery",
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
        <h3 className={classes.title}>Image Gallery</h3>
      </div>

      <div className="grid grid-cols-2 h-[100vh] md:grid-cols-4 gap-6 md:h-[500px] xl:h-[600px]  px-5 py-10">
        {/* Left big block */}
        <div className="col-span-2 row-span-2 rounded-xl bg-gray-300 w-full h-full relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-neutral-600/50 p-2 rounded-md cursor-pointer">
            {loading && <LoadingSpinner size={20} dark={true} />}
            {!loading && <Edit size={20} onClick={() => handleEditClick(0)} />}
          </div>
          <div className="absolute inset-0 bg-black opacity-10 z-10 pointer-events-none" />
          <img
            src={images[0]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover "
          />
        </div>

        {/* Top right small block 1 */}
        <div className="rounded-xl bg-gray-400 w-full h-full relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-neutral-600/50 p-2 rounded-md cursor-pointer">
            {loading && <LoadingSpinner size={20} dark={true} />}
            {!loading && <Edit size={20} onClick={() => handleEditClick(1)} />}
          </div>
          <img
            src={images[1]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover "
          />
        </div>

        {/* Top right small block 2 */}
        <div className="rounded-xl bg-gray-400 w-full h-full relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-neutral-600/50 p-2 rounded-md cursor-pointer">
            {loading && <LoadingSpinner size={20} dark={true} />}
            {!loading && <Edit size={20} onClick={() => handleEditClick(2)} />}
          </div>
          <img
            src={images[2]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover "
          />
        </div>
        <div className="col-span-2 rounded-xl bg-gray-400 w-full h-full relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-neutral-600/50 p-2 rounded-md cursor-pointer">
            {loading && <LoadingSpinner size={20} dark={true} />}
            {!loading && <Edit size={20} onClick={() => handleEditClick(3)} />}
          </div>
          <img
            src={images[3]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover "
          />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </Card>
  );
};

export default ImageGallery;
