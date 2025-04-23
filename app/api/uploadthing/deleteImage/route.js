"use server";
import connectDB from "@/lib/connectDB";
import Product from "@/models/productsModel";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export const GET = async (req) => {};

export const POST = async (req) => {};
export const DELETE = async (req) => {
  try {
    console.log("start");
    const utapi = new UTApi();
    const { name, productId } = await req.json();

    connectDB();

    const product = await Product.findById(productId);

    product.imageUrls = product.imageUrls.filter((item) => item !== name);

    await product.save();

    const id = name.split("/")[4];
    const res = await utapi.deleteFiles(id);
    console.log("finish");
    return NextResponse.json(name);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};
