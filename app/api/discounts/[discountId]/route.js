import connectDB from "@/lib/connectDB";
import Discount from "@/models/discountModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    connectDB();

    const id = params.discountId;
    const discount = await Discount.findById(id);

    if (discount) {
      return NextResponse.json(discount);
    } else {
      return NextResponse.json(
        { error: "Discount Not Found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req, { params }) => {
  const body = await req.json();
  const { discountId } = params;

  console.log("bodyy", body);

  connectDB();
  try {
    let discount = await Discount.findById(discountId);

    Object.assign(discount, body);

    await discount.save();
    console.log(discount);
    return NextResponse.json({ message: "updated succesfuly" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
