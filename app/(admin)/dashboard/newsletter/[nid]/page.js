import NewsletterDetails from "@/components/dashboard/newsletter/NewsletterDetails";
import MiniNav from "@/components/dashboard/UI/MiniNav";
import React from "react";

const page = ({ params }) => {
  const id = params.nid;
  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/dashboard/newsletter",
      label: "Newsletter",
      last: true,
    },
  ];
  return (
    <div>
      <MiniNav links={links} />
      <NewsletterDetails id={id} />
    </div>
  );
};

export default page;
