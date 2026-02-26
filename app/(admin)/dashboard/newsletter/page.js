import NewsletterNewButton from "@/components/dashboard/tables/newsletter/NewsletterNewButton";
import NewsletterTable from "@/components/dashboard/tables/newsletter/NewsletterTable";
import MiniNav from "@/components/dashboard/UI/MiniNav";
import React from "react";

const page = () => {
  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/newsletter",
      label: "Newsletter",
      last: true,
    },
  ];
  return (
    <div>
      <MiniNav links={links} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="text-4xl font-medium">Newsletter</h1>

        <NewsletterNewButton />
      </div>

      <NewsletterTable />
    </div>
  );
};

export default page;
