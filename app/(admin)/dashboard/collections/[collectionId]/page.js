import CollectionsEdit from "@/components/dashboard/collections/CollectionsEdit";
import MiniNav from "@/components/dashboard/UI/MiniNav";
import React from "react";

const page = ({ params }) => {
  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/dashboard/collections",
      label: "Collections",
    },
    {
      href: "/collections",
      label: "Edit Collection",
      last: true,
    },
  ];
  return (
    <div>
      <MiniNav links={links} />

      <h1 className="text-4xl font-medium mb-6">Collection edit</h1>
      <CollectionsEdit collectionId={params.collectionId} />
    </div>
  );
};

export default page;
