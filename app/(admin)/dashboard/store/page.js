"use client";

import StoreMain from "@/components/dashboard/store/StoreMain";
import MiniNav from "@/components/dashboard/UI/MiniNav";

const page = () => {
  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/orders",
      label: "Orders",
      last: true,
    },
  ];

  return (
    <div>
      <MiniNav links={links} />

      <h1 className="text-4xl font-medium mb-6">Store</h1>
      <StoreMain />
    </div>
  );
};

export default page;
