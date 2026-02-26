import { useForm } from "react-hook-form";
import classes from "../product/ProductForm.module.css";
import Card from "../UI/Card";
import TextInput from "../UI/inputs/TextInput";
import ReactQuill from "react-quill";
import InputError from "../UI/inputs/InputError";
import "react-quill/dist/quill.snow.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import SubmitButton from "../UI/SubmitButton";

const NewsletterForm = ({ defaultValues, submitHandler, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="mt-6">
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
        <div className={classes.inputContainer}>
          <label className={classes.label}>Title</label>
          <TextInput
            className={classes.input}
            {...register("subject", {
              required: {
                value: true,
                message: "Subject is required",
              },
            })}
            type="text"
          />

          <InputError style={{ marginTop: 8 }}>
            {errors.subject?.message}
          </InputError>
        </div>
        <div className="flex flex-col gap-2">
          <label>Body</label>

          <ReactQuill
            theme="snow"
            value={watch("body")}
            onChange={(value) => setValue("body", value)}
          />

          {errors.body && <p>{errors.body.message}</p>}
        </div>
      </Card>
      <div className="flex justify-end  ">
        <SubmitButton type="submit" className={classes.button}>
          {loading && <LoadingSpinner size={18} />}
          {!loading && "Save & Send"}
        </SubmitButton>
      </div>
    </form>
  );
};

export default NewsletterForm;
