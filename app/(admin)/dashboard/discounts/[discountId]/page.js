import DiscountEdit from "@/components/dashboard/discounts/DiscountEdit";
import MiniNav from "@/components/dashboard/UI/MiniNav";

const page = ({ params }) => {
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
      label: "Edit",
      last: true,
    },
  ];
  return (
    <div>
      <MiniNav links={links} />

      <h1 className="text-4xl font-medium">Edit Discount</h1>

      <DiscountEdit discountId={params.discountId} />
    </div>
  );
};

export default page;
