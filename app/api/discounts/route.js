import connectDB from "@/lib/connectDB";
import Discount from "@/models/discountModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const page = req.nextUrl.searchParams.get("page") || 1;
  const search = req.nextUrl.searchParams.get("search") || "";
  const ITEMS_PERPAGE = 10;

  try {
    connectDB();

    const documentCount = await Discount.countDocuments({
      $or: [{ code: { $regex: search } }, { name: { $regex: search } }],
    });

    const discounts = await Discount.find({
      $or: [{ code: { $regex: search } }, { name: { $regex: search } }],
    })
      .limit(ITEMS_PERPAGE)
      .skip((page - 1) * ITEMS_PERPAGE)
      .sort({ date: -1 });

    const pageCount = Math.ceil(documentCount / ITEMS_PERPAGE);

    return NextResponse.json({ discounts, pageCount, search });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};

export const POST = async (req) => {
  connectDB();

  const body = await req.json();

  try {
    const discount = new Discount({ ...body });

    const createdDiscount = await discount.save();

    return NextResponse.json({ discount });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error });
  }
};

export const DELETE = async (req) => {
  try {
    connectDB();
    const body = await req.json();

    const result = await Discount.deleteMany({ _id: { $in: body } });
    console.log(body);
    return NextResponse.json({ message: "done" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
