"use client";
import { useRouter } from "next/navigation";
import NewsletterForm from "./NewsletterForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleBanner } from "@/lib/banner";

const NewsletterNew = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const submitHandler = async (data) => {
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const oo = await res.json();
      router.push(`/dashboard/newsletter/${oo.newsletter._id}`);

      toggleBanner(dispatch, "Newsletter sent successfully!", "#00431b");
    } catch (e) {
      console.log(e);
      toggleBanner(dispatch, e.message, "red");
    }

    console.log(data);

    setLoading(false);
  };
  return (
    <div>
      <NewsletterForm submitHandler={submitHandler} loading={loading} />
    </div>
  );
};

export default NewsletterNew;
