import connectDB from "@/lib/connectDB";
import { newsletterGenerator } from "@/lib/newsletterGenerator";
import { transporter } from "@/lib/nodemailer";
import Newsletter from "@/models/newsletterModel";
import Order from "@/models/ordersModel";

import { NextResponse } from "next/server";

export const GET = async (req) => {
  const page = req.nextUrl.searchParams.get("page") || 1;
  const search = req.nextUrl.searchParams.get("search") || "";
  const ITEMS_PERPAGE = 10;

  try {
    connectDB();

    const documentCount = await Newsletter.countDocuments({
      $or: [{ title: { $regex: search } }],
    });

    const newsletters = await Newsletter.find({
      $or: [{ title: { $regex: search } }],
    })
      .limit(ITEMS_PERPAGE)
      .skip((page - 1) * ITEMS_PERPAGE)
      .sort({ date: -1 });

    const pageCount = Math.ceil(documentCount / ITEMS_PERPAGE);

    return NextResponse.json({ newsletters, pageCount, search });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};

export const POST = async (req) => {
  connectDB();

  const body = await req.json();

  // Get all emails from orders
  const orders = await Order.find({}, "address.email");
  const emails = orders.map((order) => order.address.email).filter(Boolean);
  console.log(emails);

  try {
    const newsletter = new Newsletter({ ...body });

    await transporter.sendMail({
      from: process.env.EMAIL,
      bcc: emails,
      subject: newsletter.subject,

      html: newsletterGenerator(newsletter),
    });

    const createdNewsletter = await newsletter.save();

    return NextResponse.json({ newsletter });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error });
  }
};

export const DELETE = async (req) => {
  try {
    connectDB();
    const body = await req.json();

    const result = await Newsletter.deleteMany({ _id: { $in: body } });
    console.log(body);
    return NextResponse.json({ message: "done" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
