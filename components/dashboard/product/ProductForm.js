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
}) => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const { register, handleSubmit, watch, setValue, control, formState } =
    useForm({
      defaultValues: {
        ...defaultValues,
        // stock: [{ optionName: "S", available: 23 }],
      },
    });

  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "stock",
    control,
  });

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await fetch("/api/store", {
        method: "GET",
      });

      const data = await response.json();

      setCategories(data.categories);
      console.log(data.categories[1]);
    } catch (error) {
      console.log(error);
    }
    setCategoriesLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    setValue("category", defaultValues?.category || categories[0]);
  }, [categoriesLoading]);

  const watchFields = watch(["price", "costPerItem"]);
  const margin = ((watchFields[0] - watchFields[1]) / watchFields[0]) * 100;
  return (
    <form onSubmit={handleSubmit(submitHandler)} className={classes.main}>
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
            <label>Description</label>

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

        <Card className={classes.variants}>
          <div className={classes.inputContainer}>
            <p className={classes.title}>Stock</p>
            <div className={classes.stock}>
              {fields.map((item, index) => (
                <Stock
                  key={item.id}
                  register={register}
                  index={index}
                  remove={remove}
                  errors={errors}
                />
              ))}
            </div>
            <button
              type="button"
              className={classes.addsizebutton}
              onClick={() => append({ optionName: "", available: 0 })}
            >
              Add +
            </button>
          </div>
        </Card>
        <button className={classes.submitDesktop} type="submit">
          {!submitLoading && "Save"}
          {submitLoading && <LoadingSpinner size={16} />}
        </button>
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

        <p>Category</p>

        <select
          className={classes.select}
          name="category"
          {...register("category")}
        >
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>

        <p>Featured</p>
        <select
          className={classes.select}
          name="featured"
          {...register("featured")}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </Card>
      <button className={classes.submitMobile} type="submit">
        {!submitLoading && "Save"}
        {submitLoading && <LoadingSpinner size={20} />}
      </button>
    </form>
  );
};

export default ProductForm;
