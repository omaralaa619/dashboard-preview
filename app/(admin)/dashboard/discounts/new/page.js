import DiscountNew from "@/components/dashboard/discounts/DiscountNew";
import MiniNav from "@/components/dashboard/UI/MiniNav";
import { Suspense } from "react";

const page = () => {
  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/dashboard/discounts",
      label: "Discounts",
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

      <Suspense fallback={<div>Loading...</div>}>
        <DiscountNew />
      </Suspense>
    </div>
  );
};

export default page;
