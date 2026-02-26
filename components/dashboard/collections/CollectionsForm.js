"use client";

import ProductItem from "../discounts/buyXgetY/ProductItem";
import Search from "../discounts/buyXgetY/Search";
import Card from "../UI/Card";
import TextInput from "../UI/inputs/TextInput";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./CollectionsForm.module.css";
import { useRef } from "react";
import { Edit } from "lucide-react";
import SubmitButton from "../UI/SubmitButton";

const CollectionsForm = ({
  products = [],
  setProducts,
  title,
  setTitle,
  description,
  setDescription,
  image,
  setImage,
  submitLoading,
  handleSubmit,
}) => {
  const fileInputRef = useRef(null);

  const imageSrcHandler = (file) => {
    if (!file) return null;

    if (typeof file === "object") {
      return URL.createObjectURL(file);
    }

    return file;
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {/* Title & Description */}
      <Card className={classes.first}>
        <div className={classes.inputContainer}>
          <label className={classes.label}>Title</label>
          <TextInput
            className={classes.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            type="text"
          />
        </div>

        <div className={classes.inputContainer}>
          <label className={classes.label}>Description</label>
          <TextInput
            className={classes.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            type="text"
          />
        </div>
      </Card>

      {/* Products */}
      <Card className={classes.card}>
        <div>
          <div className={`${classes.title} flex gap-2 items-center`}>
            <p>Products</p>
            <p className="text-xs text-neutral-400">{products.length}</p>
          </div>

          <div className="p-4 flex flex-col gap-4 md:flex-row">
            <Search setProductsList={setProducts} selectedProducts={products} />
          </div>

          {products.length > 0 && (
            <div className="m-4 max-h-64 overflow-y-auto pr-2">
              <ul className="flex flex-col gap-2">
                {[...products].reverse().map((product) => (
                  <ProductItem
                    key={product._id || product.id}
                    product={product}
                    setProductsList={setProducts}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>

      {/* Image */}
      <Card className={classes.card}>
        <div>
          <div className={classes.title}>
            <p>Image</p>
          </div>

          <div className="p-4">
            <div className="rounded-xl bg-gray-600 relative overflow-hidden aspect-[16/9]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-neutral-600/50 p-2 rounded-md cursor-pointer">
                <Edit size={20} onClick={handleEditClick} />
              </div>

              {image && (
                <img
                  src={imageSrcHandler(image)}
                  alt="Collection"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={handleFileChange}
          />
        </div>
      </Card>

      {/* Submit */}
      <SubmitButton type="submit">
        {submitLoading ? <LoadingSpinner size={18} /> : "Save"}
      </SubmitButton>
    </form>
  );
};

export default CollectionsForm;
