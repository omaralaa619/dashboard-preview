"use client";
import MiniNav from "@/components/dashboard/UI/MiniNav";

import React from "react";
import dynamic from "next/dynamic";
const NewsletterNew = dynamic(
  () => import("@/components/dashboard/newsletter/NewsletterNew"),
  {
    ssr: false,
  }
);

const page = () => {
  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/dashboard/newsletter",
      label: "Newsletter",
    },
    {
      href: "/orders",
      label: "New",
      last: true,
    },
  ];
  return (
    <div>
      <MiniNav links={links} />

      <h1 className="text-4xl font-medium">New Discount</h1>

      <NewsletterNew />
    </div>
  );
};

export default page;
