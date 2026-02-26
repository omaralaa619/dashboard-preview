"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "./ProductForm";

import { toggleBanner } from "@/lib/banner";
import { useDispatch } from "react-redux";
import { useUploadThing } from "@/utils/uploadthing";
import EditSkeleton from "./EditSkeleton";

const ProductNew = () => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [collections, setCollections] = useState([]);

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

    console.log(data);

    setLoading(false);
  };

  const fetchCollections = async () => {
    setCategoriesLoading(true);
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });

      const data = await res.json();

      setCollections(data.collections);
    } catch (error) {
      console.log(error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div>
      {!categoriesLoading && (
        <ProductForm
          files={files}
          setFiles={setFiles}
          permittedFileInfo={permittedFileInfo}
          submitHandler={submitHandler}
          submitLoading={loading}
          stock={stockOptions}
          collections={collections}
        />
      )}
      {categoriesLoading && <EditSkeleton />}
    </div>
  );
};

export default ProductNew;
