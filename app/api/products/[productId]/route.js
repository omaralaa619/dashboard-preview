import connectDB from "@/lib/connectDB";
import Product from "@/models/productsModel";
import Collection from "@/models/collectionModel";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export const GET = async (request, { params }) => {
  connectDB();

  try {
    const id = params.productId;

    const product = await Product.findById(id).populate("collections");

    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ error: "Product Not Found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
export const POST = async (req, { params }) => {
  const body = await req.json();
  const { productId } = params;

  connectDB();
  try {
    let product = await Product.findById(productId);

    const slug = body.title
      .toLowerCase()
      .replace(/[^\u0600-\u06FFa-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    product.title = body.title;
    product.slug = slug;
    product.price = body.price;
    product.costPerItem = body.costPerItem;
    product.compareAtPrice = +body.compareAtPrice;
    product.description = body.description;
    product.status = body.status;
    product.category = body.category;
    product.featured = body.featured;
    product.sizes = body.sizes || [];
    product.colors = body.colors || [];
    product.variants = body.variants || [];
    if (Array.isArray(body.newImageUrls) && body.newImageUrls.length > 0) {
      product.imageUrls = [...product.imageUrls, ...body.newImageUrls];
    }
    await product.save();

    const collectionIds = body.collections || [];
    if (collectionIds.length > 0) {
      // run both updates in parallel and await them together
      await Promise.all([
        Collection.updateMany(
          { _id: { $in: collectionIds } },
          { $addToSet: { products: product._id } },
        ),
        Collection.updateMany(
          { _id: { $nin: collectionIds } },
          { $pull: { products: product._id } },
        ),
      ]);
    } else {
      // if no collections provided, remove product from all collections
      await Collection.updateMany({}, { $pull: { products: product._id } });
    }

    revalidateTag("home");
    revalidateTag(`product-${slug}`);
    revalidateTag("collections");
    return NextResponse.json({ message: "updated succesfuly" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
