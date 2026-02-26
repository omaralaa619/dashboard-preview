"use client";
import CollectionsPageButton from "@/components/dashboard/tables/collections/CollectionsPageButton";
import CollectionTable from "@/components/dashboard/tables/collections/CollectionTable";
import MiniNav from "@/components/dashboard/UI/MiniNav";

const page = () => {
  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/collections",
      label: "Collections",
      last: true,
    },
  ];

  return (
    <div>
      <MiniNav links={links} />

      <div className="flex justify-between items-center  mb-6">
        <h1 className="text-4xl font-medium">Collections</h1>

        <CollectionsPageButton />
      </div>
      <CollectionTable />
    </div>
  );
};

export default page;
