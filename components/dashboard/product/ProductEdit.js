"use client";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { useUploadThing } from "@/utils/uploadthing";
import EditSkeleton from "./EditSkeleton";
import { toggleBanner } from "@/lib/banner";
import { useDispatch } from "react-redux";

const ProductEdit = ({ productId }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [product, setProduct] = useState({});

  const dispatch = useDispatch();

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadError: () => {
      setSubmitLoading(false);
      toggleBanner(dispatch, "Error occured please try again", "red");
    },
  });

  const submitHandler = async (data) => {
    setSubmitLoading(true);
    try {
      const updatedFiles = files.filter((item) => typeof item === "object");
      let newImageUrls;

      if (updatedFiles.length != 0) {
        const uploadedImages = await startUpload(updatedFiles);

        newImageUrls = uploadedImages.map((image) => {
          return image.url;
        });
      } else {
        newImageUrls = [];
      }

      const res = await fetch(`/api/products/${productId}`, {
        method: "POST",
        body: JSON.stringify({
          ...data,
          newImageUrls,
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const oo = await res.json();
      console.log(oo);
      toggleBanner(dispatch, "Product updated successfully", "#00431b");
      fetchProduct();
    } catch (e) {
      console.log(error);
      toggleBanner(dispatch, "Error occured please try again", "red");
    }
    setSubmitLoading(false);
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "GET",
      });

      if (response) {
        const data = await response.json();
        setProduct(data);
        setFiles(data.imageUrls);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      {!loading && (
        <ProductForm
          defaultValues={product}
          files={files}
          setFiles={setFiles}
          permittedFileInfo={permittedFileInfo}
          submitHandler={submitHandler}
          productId={productId}
          loading={loading}
          submitLoading={submitLoading}
        />
      )}

      {loading && <EditSkeleton />}
    </div>
  );
};

export default ProductEdit;
