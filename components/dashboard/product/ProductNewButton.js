import { useRouter } from "next/navigation";

const ProductNewButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("products/new")}
      className="DashbardProductPageButton"
    >
      New Product
    </button>
  );
};

export default ProductNewButton;
