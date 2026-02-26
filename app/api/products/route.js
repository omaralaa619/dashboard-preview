import connectDB from "@/lib/connectDB";
import Collection from "@/models/collectionModel";
import Product from "@/models/productsModel";
import { revalidateTag } from "next/cache";

import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const ITEMS_PERPAGE = 10;
    const page = req.nextUrl.searchParams.get("page") || 1;
    const search = req.nextUrl.searchParams.get("search") || "";
    let status = req.nextUrl.searchParams.get("status") || "active";

    connectDB();

    const documentCount = await Product.countDocuments({
      title: { $regex: search, $options: "i" },
      status: status,
    });

    console.log("document count products", documentCount);

    const products = await Product.find({
      title: { $regex: search, $options: "i" },
      status: status,
    })
      .sort({ date: -1 })
      .limit(ITEMS_PERPAGE)
      .skip((page - 1) * ITEMS_PERPAGE);

    const pageCount = Math.ceil(documentCount / ITEMS_PERPAGE);

    return NextResponse.json({ pageCount, products, search });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};

export const POST = async (req) => {
  connectDB();

  const body = await req.json();

  const slug = body.title
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  console.log(slug);

  try {
    const product = new Product({ ...body, slug });

    const createdProduct = await product.save();

    const collectionIds = body.collections || [];
    if (collectionIds.length > 0) {
      // Add the created product to the selected collections' `products` arrays
      await Collection.updateMany(
        { _id: { $in: collectionIds } },
        { $addToSet: { products: createdProduct._id } },
      );
    }

    revalidateTag("home");
    revalidateTag("collections");

    return NextResponse.json({
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return new Response(error);
  }
};

export const PUT = async (req) => {
  try {
    connectDB();

    const { checkedProducts, archivedStatus } = await req.json();

    // get status from body
    const toStatus = archivedStatus;

    const res = await Product.updateMany(
      { _id: { $in: checkedProducts } },
      {
        $set: {
          status: toStatus,
        },
      },
    );

    revalidateTag("home");
    revalidateTag("collections");
    // revalidateTag(`product-${slug}`);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(error);
  }
};

export const DELETE = async (req) => {
  try {
    connectDB();
    const body = await req.json();

    const result = await Product.deleteMany({ _id: { $in: body } });

    revalidateTag("home");
    revalidateTag("collections");
    return NextResponse.json({ message: result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
};
