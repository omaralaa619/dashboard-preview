import connectDB from "@/lib/connectDB";
import Product from "@/models/productsModel";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  connectDB();

  try {
    const id = params.productId;

    const product = await Product.findById(id);

    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ error: "Product Not Found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
export const POST = async (req, { params }) => {
  const body = await req.json();
  const { productId } = params;

  connectDB();
  try {
    let product = await Product.findById(productId);

    (product.title = body.title),
      (product.price = body.price),
      (product.costPerItem = body.costPerItem),
      (product.compareAtPrice = +body.compareAtPrice),
      (product.description = body.description),
      (product.status = body.status),
      (product.stock = body.stock),
      (product.category = body.category),
      (product.featured = body.featured),
      (product.imageUrls = [...product.imageUrls, ...body.newImageUrls]);
    await product.save();
    console.log(product);
    return NextResponse.json({ message: "updated succesfuly" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
