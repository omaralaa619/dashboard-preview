"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { toggleBanner } from "@/lib/banner";
import CollectionsForm from "./CollectionsForm";
import { useDispatch } from "react-redux";
import { useUploadThing } from "@/utils/uploadthing";

const CollectionsNew = () => {
  const dispatch = useDispatch();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadError: () => {
      toggleBanner(dispatch, "Error occured please try again", "error");
    },
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      let imageUrl;
      if (typeof image === "object") {
        const uploadedImages = await startUpload([image]);

        imageUrl = uploadedImages[0].url;
      } else {
        imageUrl = image;
      }

      const productsIds = products.map((product) => product._id);
      const res = await fetch("/api/collections", {
        method: "POST",

        body: JSON.stringify({
          title: title,
          description: description,
          image: imageUrl,
          products: productsIds,
        }),
      });
      const response = await res.json();
      router.push(`/dashboard/collections/${response.collection._id}`);
      toggleBanner(dispatch, "Collection created successfully ", "red");

      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitLoading(false);
    }
    console.log(image);
  };
  return (
    <div>
      <CollectionsForm
        products={products}
        setProducts={setProducts}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        image={image}
        setImage={setImage}
        submitLoading={submitLoading}
        handleSubmit={submitHandler}
      />
    </div>
  );
};

export default CollectionsNew;
