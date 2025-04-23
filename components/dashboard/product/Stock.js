import DeleteSVG from "@/svgs/DeleteSVG";
import classes from "./Stock.module.css";
import TextInput from "../UI/inputs/TextInput";
import InputError from "../UI/inputs/InputError";
const Stock = ({ register, index, remove, errors }) => {
  return (
    <div className={classes.container}>
      <div className={classes.inputContainer}>
        <label className={classes.label}>Option name</label>
        <TextInput
          type="text"
          placeholder=" Ex: Small"
          {...register(`stock.${index}.optionName`, {
            required: {
              value: true,
              message: "Stock name is required",
            },
          })}
        />

        <InputError style={{ marginTop: 8 }}>
          {errors?.stock?.[index]?.optionName?.message}
        </InputError>
      </div>

      <div className={classes.inputContainer}>
        <label className={classes.label}>Stock</label>
        <TextInput
          type="number"
          {...register(`stock.${index}.available`, {
            required: {
              value: true,
              message: "Stock number is required",
            },
          })}
        />
        <InputError style={{ marginTop: 8 }}>
          {errors?.stock?.[index]?.available?.message}
        </InputError>
      </div>
      <button
        className={classes.delete}
        type="button"
        onClick={() => remove(index)}
      >
        <DeleteSVG />
      </button>
    </div>
  );
};

export default Stock;
