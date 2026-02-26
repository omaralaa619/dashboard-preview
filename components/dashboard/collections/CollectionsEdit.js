"use client";
import { useUploadThing } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CollectionsForm from "./CollectionsForm";
import { toggleBanner } from "@/lib/banner";
import CollectionFormLoading from "./CollectionFormLoading";

const CollectionsEdit = ({ collectionId }) => {
  /////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
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
      const slug = title.toLowerCase().replace(/ /g, "-");
      const productsIds = products.map((product) => product._id);
      const res = await fetch(`/api/collections/${collectionId}`, {
        method: "POST",

        body: JSON.stringify({
          products: productsIds,
          title: title,
          image: imageUrl,
          slug: slug,
        }),
      });
      const response = await res.json();
      router.refresh();
      toggleBanner(dispatch, "Collection updated successfully ", "green");

      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitLoading(false);
    }
    console.log(image);
  };

  /////////////////////////////////////////////////////////

  const fetchCollection = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/collections/${collectionId}`, {
        method: "GET",
      });

      if (response) {
        const data = await response.json();

        console.log(data);
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  return (
    <div>
      {!loading && (
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
      )}
      {loading && <CollectionFormLoading />}
    </div>
  );
};

export default CollectionsEdit;
