import connectDB from "@/lib/connectDB";
import Collection from "@/models/collectionModel";
import Product from "@/models/productsModel";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { collectionId } = params;
  console.log(collectionId);
  try {
    connectDB();

    // populate products so the returned collection includes product docs
    const collection = await Collection.findById(collectionId).populate({
      path: "products",
    });

    return NextResponse.json(collection);
  } catch (error) {
    return NextResponse.json(error);
  }
};
export const POST = async (req, { params }) => {
  connectDB();
  const { collectionId } = params;

  const body = await req.json();
  console.log("body", body);

  const slug = body.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  console.log(slug);

  try {
    let collection = await Collection.findById(collectionId);
    Object.assign(collection, body);

    await collection.save();
    revalidateTag("home");
    return NextResponse.json({
      message: "Collection Added Successfully",
      collection,
    });
  } catch (error) {
    console.log(error);
    return new Response(error);
  }
};
