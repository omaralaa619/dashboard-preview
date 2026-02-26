import CategoryConten from "@/components/user/catgeoryContent/CategoryConten";
import { getProducts } from "@/components/user/utils";

const page = async () => {
  const products = await getProducts();
  const collection = {
    title: "Shop All",
    products,
  };

  return (
    <div className="pt-[90px]">
      <CategoryConten collection={collection} />
    </div>
  );
};

export default page;
