"use client";

import { useForm } from "react-hook-form";
import classes from "./ContactForm.module.css";
import { useState } from "react";
import LoadingSpinner from "@/components/dashboard/UI/LoadingSpinner";
import CheckSVG from "@/svgs/CheckSVG";
import { useRouter } from "next/navigation";

const ContactForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      enail: "",
      number: "",
      message: "",
    },
  });

  const submitHandler = async (data) => {
    setLoading(true);
    console.log(data);
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        data,
      }),
      headers: {
        "content-Type": "application/json",
      },
    });
    const dataa = await res.json();
    setLoading(false);
    setSent(true);
    router.push("#sent");
  };
  return (
    <div>
      <p className="text-left mb-4 text-xl font-medium">Get in touch</p>

      {sent && (
        <div className={classes.sent}>
          <CheckSVG />
          Thanks for contacting us. We&apos;ll get back to you as soon as
          possible
        </div>
      )}

      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className={classes.group}>
          <input
            className={classes.input}
            {...register("name")}
            type="text"
            required
          />
          <label className={classes.label}>Name</label>
        </div>

        <div className={classes.group}>
          <input
            className={classes.input}
            {...register("email")}
            type="email"
            required
          />
          <label className={classes.label}>E-mail</label>
        </div>
        <div className={classes.group}>
          <input
            className={classes.input}
            {...register("number")}
            type="number"
            required
          />
          <label className={classes.label}>Phone number</label>
        </div>
        <div className={classes.group}>
          <textarea
            className={classes.inputText}
            {...register("message")}
            required
            rows={5}
          />
          <label className={classes.label}>Message</label>
        </div>

        <button
          className={classes.button}
          type="submit"
          disabled={loading || sent}
        >
          {!loading && <p> Send Message</p>}
          {loading && <LoadingSpinner size={20} />}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
