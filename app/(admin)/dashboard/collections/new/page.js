import CollectionsNew from "@/components/dashboard/collections/CollectionsNew";
import MiniNav from "@/components/dashboard/UI/MiniNav";

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

      <h1 className="text-4xl font-medium mb-6">New Collection</h1>

      <CollectionsNew />
    </div>
  );
};

export default page;
