import Link from "next/link";
import ArrowBackSVG from "@/svgs/ArrowBackSVG";
import OrdersTable from "@/components/dashboard/tables/orders/OrdersTable";
import MiniNav from "@/components/dashboard/UI/MiniNav";
import { Suspense } from "react";

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

      <h1 className="text-4xl font-medium mb-6">Orders</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <OrdersTable />
      </Suspense>
    </div>
  );
};

export default page;
