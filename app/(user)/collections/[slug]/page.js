import CategoryConten from "@/components/user/catgeoryContent/CategoryConten";
import { getProductsCollection } from "@/components/user/utils";
import connectDB from "@/lib/connectDB";
import Collection from "@/models/collectionModel";

export async function generateStaticParams() {
  await connectDB();
  const collections = await Collection.find({}, "slug");

  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

const page = async ({ params }) => {
  const slug = params.slug;

  const { collection } = await getProductsCollection(slug);

  return (
    <div className="pt-[90px]">
      <CategoryConten collection={collection} />
    </div>
  );
};

export default page;
