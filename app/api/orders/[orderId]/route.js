import connectDB from "@/lib/connectDB";
import Order from "@/models/ordersModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { orderId } = params;
  console.log(orderId);
  try {
    connectDB();

    const order = await Order.findById(orderId);

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(error);
  }
};
export const PUT = async (req, { params }) => {
  const { orderId } = params;

  try {
    connectDB();
    const res = await Order.findByIdAndUpdate(orderId, { status: true });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
};
export const POST = async (req, { params }) => {
  const body = await req.json();
  const { orderId } = params;

  try {
    connectDB();
    const order = await Order.findById(orderId);

    order.address = body.data;

    await order.save();

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const DELETE = async (req, { params }) => {
  const { orderId } = params;

  console.log(orderId);

  try {
    connectDB();

    const order = await Order.findByIdAndDelete(orderId);

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(error);
  }
};
