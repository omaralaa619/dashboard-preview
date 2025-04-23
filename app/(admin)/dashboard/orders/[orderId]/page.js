import Link from "next/link";

import OrderDetails from "@/components/dashboard/order/OrderDetails";
import MiniNav from "@/components/dashboard/UI/MiniNav";

const page = ({ params }) => {
  const id = params.orderId;

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

      <OrderDetails id={id} />
    </div>
  );
};

export default page;
