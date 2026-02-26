"use client";
import { useFieldArray, useForm } from "react-hook-form";
import classes from "./ProductForm.module.css";
import MediaInput from "./MediaInput";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import Stock from "./Stock";
import TextInput from "../UI/inputs/TextInput";
import InputError from "../UI/inputs/InputError";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DeleteSVG from "@/svgs/DeleteSVG";
import { Delete, Trash2 } from "lucide-react";
import SubmitButton from "../UI/SubmitButton";

const ProductForm = ({
  submitHandler,
  defaultValues,
  files,
  setFiles,
  permittedFileInfo,
  productId,
  loading,
  submitLoading,
  stock,
  collections,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      ...defaultValues,
      sizes: defaultValues?.sizes || [""],
      colors:
        defaultValues?.colors?.map((c) => ({
          name: c.name || "",
          color: c.color || "#000000",
        })) || [],
      variants: defaultValues?.variants || [],
    },
  });

  const { errors } = formState;

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    name: "sizes",
    control,
  });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    name: "colors",
    control,
  });

  useEffect(() => {
    // Initialize `collections` in the form. Accepts defaultValues.collections as
    // either array of ids or array of objects. Resolve ids to full objects when possible.
    const defs = defaultValues?.collections || [];
    if (!defs || defs.length === 0) return;
    const initialCollections = defs.map((c) => {
      if (typeof c === "string") {
        const found = (collections || []).find(
          (col) => String(col._id) === String(c),
        );
        return found || { _id: c, title: String(c) };
      }
      return c;
    });
    setValue("collections", initialCollections);
  }, [defaultValues, collections, setValue]);

  const watchFields = watch(["price", "costPerItem"]);
  const margin = ((watchFields[0] - watchFields[1]) / watchFields[0]) * 100;
  const collectionList = watch("collections") || [];

  // Generate all combinations of sizes and colors, or just sizes or just colors
  const sizes = watch("sizes").filter((s) => s && s.trim() !== "");
  const colors = watch("colors").filter(
    (c) => c.name && c.name.trim() !== "" && c.color,
  );
  const variants = [];
  if (sizes.length > 0 && colors.length > 0) {
    sizes.forEach((size) => {
      colors.forEach((color) => {
        variants.push({
          size,
          colorName: color.name,
          colorHex: color.color,
        });
      });
    });
  } else if (sizes.length > 0) {
    sizes.forEach((size) => {
      variants.push({
        size,
        colorName: "",
        colorHex: "",
      });
    });
  } else if (colors.length > 0) {
    colors.forEach((color) => {
      variants.push({
        size: "",
        colorName: color.name,
        colorHex: color.color,
      });
    });
  }

  // Store stock for each variant
  const [variantStocks, setVariantStocks] = useState(() => {
    const initial = {};
    (defaultValues?.variants || []).forEach((v) => {
      initial[`${v.size}|${v.colorHex}`] = v.stock || 0;
    });
    return initial;
  });

  // Update stock when user types
  const handleStockChange = (key, value) => {
    setVariantStocks((prev) => ({ ...prev, [key]: value }));
  };

  // On submit, send variants array
  const onSubmit = (data) => {
    const variantsArr = variants.map((v) => ({
      ...v,
      stock: Number(variantStocks[`${v.size}|${v.colorHex}`] || 0),
    }));
    // Prepare sizes as array of strings
    const sizesArr = (data.sizes || []).filter((s) => s && s.trim() !== "");
    // Prepare colors as array of {name, color}
    const colorsArr = (data.colors || []).filter(
      (c) => c.name && c.name.trim() !== "" && c.color,
    );
    // Validate at least one variant
    if (variantsArr.length === 0) {
      setError("variants", {
        type: "manual",
        message: "You must add at least one variant (size or color).",
      });
      return;
    }
    clearErrors("variants");
    // Ensure collections are submitted as array of ids (backend likely expects ids)
    const collectionsArr = (data.collections || []).map((c) => c?._id || c);
    submitHandler({
      ...data,
      sizes: sizesArr,
      colors: colorsArr,
      variants: variantsArr,
      collections: collectionsArr,
    });
  };

  // Clear variants error when a variant is added
  useEffect(() => {
    if (variants.length > 0) {
      clearErrors("variants");
    }
  }, [variants.length, clearErrors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.main}>
      <div className={classes.left}>
        <Card className={classes.first}>
          <div className={classes.inputContainer}>
            <label className={classes.label}>Title</label>
            <TextInput
              className={classes.input}
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is required",
                },
              })}
              type="text"
            />

            <InputError style={{ marginTop: 8 }}>
              {errors.title?.message}
            </InputError>
          </div>
          <div>
            <label className={classes.label}>Description</label>

            <ReactQuill
              theme="snow"
              value={watch("description")} // Get the value of "description"
              onChange={(value) => setValue("description", value)} // Update the value in the form
            />

            {errors.description && <p>{errors.description.message}</p>}
          </div>
        </Card>

        <Card>
          <p className={classes.title}>Media</p>
          <div className={classes.mediaMain}>
            <MediaInput
              files={files}
              permittedFileInfo={permittedFileInfo}
              setFiles={setFiles}
              productId={productId}
            />
          </div>
        </Card>

        <Card className={classes.pricing}>
          <p className={classes.title}>Pricing</p>

          <div className={classes.pricingMain}>
            <div className={classes.pricingTop}>
              <div className={classes.inputContainer}>
                <label className={classes.label}>Price</label>

                <div className={classes.priceInput}>
                  <p>E£</p>
                  <TextInput
                    className={classes.input}
                    {...register("price", {
                      required: {
                        value: true,
                        message: "Price is required",
                      },
                    })}
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                  />
                </div>
                <InputError style={{ marginTop: 8 }}>
                  {errors.price?.message}
                </InputError>
              </div>
              <div className={classes.inputContainer}>
                <label className={classes.label}>Compare at price</label>
                <div className={classes.priceInput}>
                  <p>E£</p>
                  <TextInput
                    className={classes.input}
                    {...register("compareAtPrice")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <div className={classes.pricingTop}>
              <div className={classes.inputContainer}>
                <label className={classes.label}>Cost per item</label>
                <div className={classes.priceInput}>
                  <p>E£</p>
                  <TextInput
                    className={classes.input}
                    {...register("costPerItem")}
                    type="number"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className={classes.inputContainer}>
                <label className={classes.label}>Profit</label>
                <div className={classes.priceInput}>
                  <p>E£</p>
                  <TextInput
                    className={classes.input}
                    disabled={true}
                    value={watchFields[0] - watchFields[1]}
                    type="number"
                  />
                </div>
              </div>
              <div className={classes.inputContainer}>
                <label className={classes.label}>Margin</label>
                <TextInput
                  className={classes.input}
                  disabled={true}
                  value={
                    "% " +
                    Math.round(margin == -Infinity || !margin ? "0" : margin)
                  }
                />
              </div>
            </div>
          </div>
        </Card>

        {/* ///////////////////////  sizes  ////////////////////// */}

        <Card className={classes.variants}>
          <div className={classes.inputContainer}>
            <p className={classes.title}>Sizes</p>
            <div className={classes.stock}>
              {errors.sizes && typeof errors.sizes.message === "string" && (
                <InputError>{errors.sizes.message}</InputError>
              )}
              {sizeFields.map((item, index) => (
                <div key={item.id || index} className={classes.container}>
                  <div className={classes.inputContainer}>
                    <label className={classes.label}>Size</label>
                    <div className="flex gap-2">
                      <TextInput
                        className="w-full"
                        type="text"
                        {...register(`sizes.${index}`, {
                          required: {
                            value: true,
                            message: "Size is required",
                          },
                        })}
                        placeholder="Ex: Small"
                      />
                      <button
                        type="button"
                        className={classes.delete}
                        onClick={() => removeSize(index)}
                      >
                        <DeleteSVG />
                      </button>
                    </div>
                    <InputError style={{ marginTop: 8 }}>
                      {errors.sizes?.[index]?.message}
                    </InputError>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className={classes.addsizebutton}
              onClick={() => appendSize("")}
            >
              Add Size +
            </button>
          </div>
        </Card>
        <Card className={classes.variants}>
          <div className={classes.inputContainer}>
            <p className={classes.title}>Colors</p>
            <div className={classes.stock}>
              {colorFields.map((item, index) => (
                <div key={item.id} className={classes.container}>
                  <div className={classes} style={{ width: "100%" }}>
                    <label className={"label"}>Color</label>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <input
                        type="color"
                        {...register(`colors.${index}.color`)}
                        defaultValue={item.color || "#000000"}
                        style={{
                          minWidth: 40,
                          minHeight: 40,
                          border: "none",
                          background: "none",
                          padding: 0,
                        }}
                      />
                      <p
                        style={{
                          width: 70,
                          margin: 0,
                          padding: 8,
                          color: "#888",

                          fontFamily: "monospace",
                          fontSize: 14,
                        }}
                      >
                        {watch(`colors.${index}.color`) || "#000000"}
                      </p>

                      <TextInput
                        type="text"
                        {...register(`colors.${index}.name`, {
                          required: {
                            value: true,
                            message: "Color name is required",
                          },
                        })}
                        value={watch(`colors.${index}.name`)}
                        onChange={(e) =>
                          setValue(`colors.${index}.name`, e.target.value)
                        }
                        style={{
                          border: "1px solid var(--borders)",
                          padding: 8,
                          borderRadius: 4,
                        }}
                        placeholder="Color Name"
                        className="w-full md:w-40"
                      />
                      <button
                        type="button"
                        className={classes.delete}
                        onClick={() => removeColor(index)}
                      >
                        <DeleteSVG />
                      </button>
                    </div>
                    <InputError style={{ marginTop: 8 }}>
                      {errors.colors?.[index]?.name?.message}
                    </InputError>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className={classes.addsizebutton}
              onClick={() => appendColor({ name: "", color: "" })} // No default color value
            >
              Add Color +
            </button>
          </div>
        </Card>
        {/* Variants Table */}
        <Card className={classes.variants}>
          <div className={classes.inputContainer}>
            <p className={classes.title}>Variants</p>
            <div className={classes.stock}>
              {errors.variants && (
                <InputError>{errors.variants.message}</InputError>
              )}
              {variants.length === 0 && !errors.variants && (
                <p style={{ color: "var(--secondaryText)" }}>
                  Add at least one size or one color to create variants.
                </p>
              )}
              {variants.map((variant, idx) => {
                const key = `${variant.size}|${variant.colorHex}`;
                return (
                  <div
                    key={idx}
                    className={"container"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      marginBottom: 8,
                    }}
                  >
                    {variant.size && (
                      <div className={"inputContainer"} style={{ width: 120 }}>
                        <label className={"label"}>Size</label>
                        <div
                          style={{
                            border: "1px solid var(--borders)",
                            padding: 8,
                            borderRadius: 4,
                          }}
                        >
                          {variant.size}
                        </div>
                      </div>
                    )}
                    {variant.colorName && (
                      <div className={"inputContainer"} style={{ width: 180 }}>
                        <label className={"label"}>Color</label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              minWidth: 24,
                              minHeight: 24,
                              borderRadius: "50%",
                              background: variant.colorHex,
                              border: "1px solid var(--borders)",
                            }}
                          ></span>
                          <span className="truncate max-w-16 md:max-w-max">
                            {variant.colorName}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className={"inputContainer"} style={{ width: 120 }}>
                      <label className={"label"}>Stock</label>
                      <input
                        type="number"
                        min={0}
                        defaultValue={0}
                        value={variantStocks[key]}
                        onChange={(e) => handleStockChange(key, e.target.value)}
                        style={{
                          border: "1px solid var(--borders)",
                          padding: 8,
                          borderRadius: 4,
                          width: 80,
                          background: "none",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
        <SubmitButton className={classes.submitDesktop} type="submit">
          {!submitLoading && "Save"}
          {submitLoading && <LoadingSpinner size={16} />}
        </SubmitButton>
      </div>

      <Card className={classes.right}>
        <p>Status</p>

        <select
          className={classes.select}
          name="status"
          {...register("status")}
        >
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>

        <p>Collections</p>

        {/* Single select to add a collection object to the product's collections array */}
        <select
          className={classes.select}
          defaultValue=""
          onChange={(e) => {
            const json = e.target.value;
            if (!json) return;
            let selected;
            try {
              selected = JSON.parse(json);
            } catch (err) {
              return;
            }
            const current = Array.isArray(collectionList)
              ? [...collectionList]
              : [];
            if (
              !current.some((c) => String(c?._id) === String(selected?._id))
            ) {
              setValue("collections", [...current, selected]);
            }
            e.target.value = "";
          }}
        >
          <option value="" disabled>
            Select collection
          </option>
          {(collections || [])
            .filter(
              (c) =>
                !(collectionList || []).some(
                  (x) => String(x?._id) === String(c._id),
                ),
            )
            .map((collection) => (
              <option key={collection._id} value={JSON.stringify(collection)}>
                {collection.title}
              </option>
            ))}
        </select>

        {/* Selected collections displayed as chips with remove (x) buttons */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          {(collectionList || []).map((collection) => {
            const id = collection?._id || String(collection);
            const title = collection?.title || id;
            return (
              <div
                key={id}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 8px",
                  borderRadius: 8,
                  background: "var(--muted)",
                  border: "1px solid var(--borders)",
                }}
              >
                <span style={{ fontSize: 13 }}>{title}</span>
                <button
                  type="button"
                  aria-label={`Remove ${title}`}
                  onClick={() => {
                    const arr = (collectionList || []).filter(
                      (i) =>
                        String(i?._id || i) !==
                        String(collection?._id || collection),
                    );
                    setValue("collections", arr);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 4,
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* <p>Featured</p>
        <select
          className={classes.select}
          name="featured"
          {...register("featured")}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select> */}
      </Card>
      <SubmitButton className={classes.submitMobile} type="submit">
        {!submitLoading && "Save"}
        {submitLoading && <LoadingSpinner size={20} />}
      </SubmitButton>
    </form>
  );
};

export default ProductForm;
