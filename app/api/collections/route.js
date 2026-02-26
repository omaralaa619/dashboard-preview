import connectDB from "@/lib/connectDB";
import Collection from "@/models/collectionModel";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";

import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const ITEMS_PERPAGE = 10;
    const page = req.nextUrl.searchParams.get("page") || 1;
    const search = req.nextUrl.searchParams.get("search") || "";
    let status = req.nextUrl.searchParams.get("status") || "active";

    connectDB();

    const documentCount = await Collection.countDocuments({
      title: { $regex: search, $options: "i" },
    });

    console.log("document count collections", documentCount);

    const collections = await Collection.find({
      title: { $regex: search, $options: "i" },
    }).sort({ order: 1 });

    const pageCount = Math.ceil(documentCount / ITEMS_PERPAGE);

    return NextResponse.json({ pageCount, collections, search });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};

export const POST = async (req) => {
  connectDB();

  const body = await req.json();
  console.log("body", body);

  const slug = body.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  console.log(slug);

  try {
    // Get the next order number
    await Collection.updateMany({}, { $inc: { order: 1 } });

    // Create new collection with order 0
    const collection = new Collection({
      ...body,
      slug,
      order: 0,
    });

    const createdCollection = await collection.save();

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

export const PUT = async (req) => {
  connectDB();

  const body = await req.json();

  try {
    await Collection.bulkWrite(
      body.map((item) => ({
        updateOne: {
          filter: { _id: new mongoose.Types.ObjectId(item._id) },
          update: { $set: { order: item.order } },
        },
      })),
    );
    revalidateTag("home");
    return NextResponse.json({
      message: "Collections Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return new Response(error);
  }
};

export const DELETE = async (req) => {
  try {
    connectDB();
    const body = await req.json();

    const result = await Collection.deleteMany({ _id: { $in: body } });
    revalidateTag("home");

    return NextResponse.json({ message: result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
};
