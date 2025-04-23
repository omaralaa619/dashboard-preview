"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "./ProductForm";

import { toggleBanner } from "@/lib/banner";
import { useDispatch } from "react-redux";
import { useUploadThing } from "@/utils/uploadthing";

const ProductNew = () => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [stockOptions, setStockOptions] = useState([
    { option: "Small", stock: 5 },
  ]);
  const dispatch = useDispatch();

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadError: () => {
      toggleBanner(dispatch, "Error occured please try again", "red");
    },
  });

  const submitHandler = async (data) => {
    setLoading(true);

    try {
      const uploadedImages = await startUpload(files);
      console.log("asas", uploadedImages);

      const imageUrls = uploadedImages.map((image) => {
        return image.url;
      });

      console.log("imageUrls", imageUrls);

      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          imageUrls,
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const oo = await res.json();
      router.push(`/dashboard/products/${oo.product._id}`);
      toggleBanner(dispatch, "Product added successfully!", "#00431b");
    } catch (e) {
      console.log(e);
      toggleBanner(dispatch, e.message, "red");
    }
    console.log(files);

    setLoading(false);
  };

  return (
    <div>
      <ProductForm
        files={files}
        setFiles={setFiles}
        permittedFileInfo={permittedFileInfo}
        submitHandler={submitHandler}
        submitLoading={loading}
        stock={stockOptions}
      />
    </div>
  );
};

export default ProductNew;
