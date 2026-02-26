"use client";

import { useRouter } from "next/navigation";

const NewsletterNewButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard/newsletter/new")}
      className="DashbardProductPageButton"
    >
      New Newsletter
    </button>
  );
};

export default NewsletterNewButton;
