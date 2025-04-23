import ProductEdit from "@/components/dashboard/product/ProductEdit";

const page = ({ params }) => {
  return (
    <div>
      <div>
        <h1 className="text-4xl font-medium">Product edit</h1>

        <ProductEdit productId={params.productId} />
      </div>
    </div>
  );
};

export default page;
