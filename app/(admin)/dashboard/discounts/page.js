"use client";
import DiscountModal from "@/components/dashboard/discounts/DiscountModal";
import DiscountNewButton from "@/components/dashboard/discounts/DiscountNewButton";
import DiscountTable from "@/components/dashboard/tables/discounts/DiscountTable";
import MiniNav from "@/components/dashboard/UI/MiniNav";
import { adminUiActions } from "@/store/admin-ui-store";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/discounts",
      label: "Discounts",
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
        <h1 className="text-4xl font-medium">Discounts</h1>

        <DiscountNewButton />
      </div>

      <DiscountTable />
      <DiscountModal />
    </div>
  );
};

export default page;
