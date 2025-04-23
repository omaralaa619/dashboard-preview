"use client";
import { useForm } from "react-hook-form";
import Card from "../UI/Card";
import classes from "./DiscountsForm.module.css";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "../UI/LoadingSpinner";
import TextInput from "../UI/inputs/TextInput";
import Checkbox from "../UI/Checkbox";
import InputError from "../UI/inputs/InputError";

const DiscountsForm = ({ submitHandler, defaultValues, submitLoading }) => {
  console.log("default values", defaultValues);

  const searchParams = useSearchParams();
  const discountType = searchParams.get("type");
  console.log(discountType);
  const valueTypeChangehandler = () => {
    setValue("value", "");
  };

  const { register, handleSubmit, watch, setValue, formState } = useForm({
    defaultValues,
  });
  const { errors } = formState;

  const watchfeilds = watch([
    "method",
    "valueType",
    "requirmentType",
    "isLimit",
    "isEndDate",
  ]);
  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      <Card className={classes.card}>
        <div className={classes.firstTop}>
          <p>
            {discountType == "shipping"
              ? "Shipping discount"
              : "Amount off order"}
          </p>
          <p className={classes.cardSecondary}>Order discount</p>
        </div>

        <div className={classes.rest}>
          <div>
            <p className={classes.methodText}>Method</p>
            <div className={classes.methodOption}>
              <label
                className={`${
                  watchfeilds[0] == "code" ? classes.selected : ""
                }`}
              >
                <p className="hidden md:block">Discount code</p>
                <p className="md:hidden">Code</p>
                <input
                  type="radio"
                  name="method"
                  value={"code"}
                  {...register("method")}
                />
              </label>
              <label
                className={`${
                  watchfeilds[0] == "automatic" ? classes.selected : ""
                }`}
              >
                <p className="hidden md:block">Automatic discount</p>
                <p className="md:hidden">Automatic</p>
                <input
                  type="radio"
                  name="method"
                  value={"automatic"}
                  {...register("method")}
                />
              </label>
            </div>
          </div>

          <div className={classes.inputContainer}>
            {watchfeilds[0] == "code" ? (
              <>
                <label>Discount code</label>
                <TextInput
                  className={classes.title}
                  type="text"
                  {...register("code", {
                    required: {
                      value: true,
                      message: "Code required",
                    },
                  })}
                />

                <InputError style={{ marginTop: 8 }}>
                  {errors.code?.message}
                </InputError>
              </>
            ) : (
              <>
                <label>Title</label>
                <TextInput
                  className={classes.title}
                  type="text"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name required",
                    },
                  })}
                />
                <InputError style={{ marginTop: 8 }}>
                  {errors.name?.message}
                </InputError>
              </>
            )}

            <p className={classes.discountCodeSub}>
              {watchfeilds[0] == "code"
                ? "Customers must enter this code at checkout."
                : "Customers will see this in their cart and at checkout."}
            </p>
          </div>
        </div>
      </Card>

      {discountType != "shipping" && (
        <Card className={classes.card}>
          <div className={classes.firstTop}>
            <p>Discount value</p>
          </div>
          <div className={`${classes.discountValueContainer} ${classes.rest}`}>
            <select
              name="type"
              className={classes.select}
              {...register("valueType")}
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>
            <div className={classes.inputContainer} style={{ flex: 1 }}>
              {watchfeilds[1] == "fixed" ? (
                <>
                  <TextInput
                    style={{
                      paddingLeft: 43,
                    }}
                    type="number"
                    {...register("amountValue", {
                      required: {
                        value: true,
                        message: "amount is required",
                      },
                      min: {
                        value: 1,
                        message: "Amount must be greater than 0",
                      },
                    })}
                    placeholder=" 0.00"
                  />
                  <p className={classes.percentInput} style={{ left: 16 }}>
                    E£
                  </p>
                </>
              ) : (
                <>
                  <TextInput
                    style={{
                      paddingRight: 43,
                    }}
                    type="number"
                    {...register("percentValue", {
                      required: {
                        value: true,
                        message: "percentage is required",
                      },
                      min: {
                        value: 1,
                        message: "Amount must be more than 0%",
                      },
                      max: {
                        value: 100,
                        message: "Amount cant be more than 100%",
                      },
                    })}
                    placeholder="0"
                  />
                  <p className={classes.percentInput}>%</p>
                </>
              )}
            </div>
          </div>

          {watchfeilds[1] != "fixed" ? (
            <InputError
              style={{ marginLeft: 16, marginBottom: 8, marginTop: -8 }}
            >
              {errors.percentValue?.message}
            </InputError>
          ) : (
            <InputError
              style={{ marginLeft: 16, marginBottom: 8, marginTop: -8 }}
            >
              {errors.amountValue?.message}
            </InputError>
          )}
        </Card>
      )}
      <Card className={classes.card}>
        <div>
          <p className={classes.firstTop}>Minimum purchase requirements</p>
        </div>
        <div className={`${classes.radioContainer} ${classes.rest}`}>
          <label>
            <input
              type="radio"
              name="requirmentType"
              value={"none"}
              defaultChecked={defaultValues.requirmentType == "none"}
              {...register("requirmentType")}
            />
            No minimum requirments
          </label>

          <label>
            <input
              type="radio"
              name="requirmentType"
              defaultChecked={defaultValues.requirmentType == "amount"}
              value={"amount"}
              {...register("requirmentType")}
            />
            <p>Minimum purchase amount</p>
          </label>

          {watchfeilds[2] == "amount" && (
            <>
              <div style={{ position: "relative" }}>
                <TextInput
                  {...register("minimumAmount", {
                    required: {
                      value: true,
                      message: "Amount is required",
                    },
                    min: {
                      value: 1,
                      message: "Amount must be greater than 0",
                    },
                  })}
                  type="number"
                  className={classes.inputMini}
                  style={{ paddingLeft: 40 }}
                />
                <p
                  className={classes.percentInput}
                  style={{ left: 32, top: "40%" }}
                >
                  E£
                </p>
              </div>

              <InputError style={{ marginLeft: 18, marginTop: -8 }}>
                {errors.minimumAmount?.message}
              </InputError>
            </>
          )}

          <label>
            <input
              type="radio"
              name="requirmentType"
              value={"quantity"}
              defaultChecked={defaultValues.requirmentType == "quantity"}
              {...register("requirmentType")}
            />
            <p>Minimum quantity of items</p>
          </label>
          {watchfeilds[2] == "quantity" && (
            <>
              <TextInput
                {...register("minimumQuantity", {
                  required: {
                    value: true,
                    message: "Quantity is required",
                  },
                  min: {
                    value: 1,
                    message: "Quantity must be greater than 0",
                  },
                })}
                type="number"
                className={classes.inputMini}
              />

              <InputError style={{ marginLeft: 18, marginTop: -8 }}>
                {errors.minimumQuantity?.message}
              </InputError>
            </>
          )}
        </div>
      </Card>
      <Card className={classes.card}>
        <div className={classes.firstTop}>
          <p>Maximum discount uses</p>
        </div>

        <div className={classes.rest}>
          <label className={classes.container} style={{ marginBottom: 8 }}>
            <p>Limit number of times this discount can be used in total</p>

            <Checkbox {...register("isLimit")} left={0} />
          </label>
          {watchfeilds[3] && (
            <>
              <TextInput
                type="number"
                {...register("limitNumber", {
                  required: {
                    value: true,
                    message: "Limit number required",
                  },
                  min: {
                    value: 1,
                    message: "Number must be greater than 0",
                  },
                })}
                className={classes.inputMini}
              />
              <InputError style={{ marginLeft: 18 }}>
                {errors.limitNumber?.message}
              </InputError>
            </>
          )}
        </div>
      </Card>
      <Card className={classes.card}>
        <div className={classes.firstTop}>
          <p>Active dates</p>
        </div>

        <div className={`${classes.dateContainer} ${classes.rest}`}>
          <div className={classes.dateItem}>
            <label>
              Start date
              <input
                type="date"
                {...register("startDate", {
                  required: {
                    value: true,
                    message: "Date is required",
                  },
                })}
              />
              <InputError>{errors.startDate?.message}</InputError>
            </label>
            <label>
              Start time
              <input
                type="time"
                {...register("startTime", {
                  required: {
                    value: true,
                    message: "Time is required",
                  },
                })}
              />
              <InputError>{errors.startTime?.message}</InputError>
            </label>
          </div>

          <label className={classes.container}>
            <p>Add end date</p>
            <Checkbox
              {...register("isEndDate")}
              left={0}
              defaultChecked={defaultValues.endDateTime != null}
            />
          </label>

          {watchfeilds[4] && (
            <div className={classes.dateItem}>
              <label>
                End date
                <input
                  type="date"
                  {...register("endDate", {
                    required: {
                      value: true,
                      message: "End date is required",
                    },
                  })}
                />
                <InputError>{errors.endDate?.message}</InputError>
              </label>
              <label>
                End time
                <input
                  type="time"
                  {...register("endTime", {
                    required: {
                      value: true,
                      message: "End time is required",
                    },
                  })}
                />
                <InputError>{errors.endTime?.message}</InputError>
              </label>
            </div>
          )}
        </div>
      </Card>

      <button type="submit" className={classes.button}>
        {submitLoading && <LoadingSpinner size={18} />}
        {!submitLoading && "Save"}
      </button>
    </form>
  );
};

export default DiscountsForm;
