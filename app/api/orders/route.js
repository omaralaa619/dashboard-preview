import connectDB from "@/lib/connectDB";
import User from "@/models/userModel";
import Order from "@/models/ordersModel";
import { NextResponse } from "next/server";
import Product from "@/models/productsModel";
import mongoose from "mongoose";
import Discount from "@/models/discountModel";
import { mailOptions, transporter } from "../../../lib/nodemailer";
import { generateMail } from "@/lib/mailGenerator";

export const GET = async (req) => {
  try {
    const ITEMS_PERPAGE = 10;
    const page = req.nextUrl.searchParams.get("page") || 1;
    const search = req.nextUrl.searchParams.get("search") || "";
    let status = req.nextUrl.searchParams.get("status") || "all";
    if (status == "all") {
      status = [true, false];
    } else if (status == "unfulfilled") {
      status = false;
    }

    console.log(status);

    connectDB();
    const documentCount = await Order.countDocuments({
      "address.number": { $regex: search },
      status: status,
    });

    const orders = await Order.find({
      // "_id.toString": { $regex: "af" },
      "address.number": { $regex: search },
      status: status,
    })
      .limit(ITEMS_PERPAGE)
      .skip((page - 1) * ITEMS_PERPAGE)
      .sort({ date: -1 });

    const pageCount = Math.ceil(documentCount / ITEMS_PERPAGE);

    return NextResponse.json({ pageCount, orders, search });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};

export const POST = async (req) => {
  connectDB();
  const products = await Product.find().lean();

  const body = await req.json();
  const { cart, address, discount } = body;

  for (const item of cart.items) {
    const id = item.id.slice(0, -item.size.length);
    const currentProduct = products.find((pro) => pro._id == id);

    console.log(currentProduct);

    const stock = currentProduct.stock.find(
      (stock) => stock.optionName === item.size
    );

    if (stock.available < item.quantity) {
      console.log("out of stock");
      return NextResponse.json(
        { error: "Some of the items in the cart are out of stock." },
        { status: 500 }
      );
    } else {
      await Product.findOneAndUpdate(
        { _id: id },
        {
          $inc: { "stock.$[elem].available": -item.quantity },
          sold: item.quantity,
        },
        {
          arrayFilters: [{ "elem.optionName": item.size }],
          new: true,
        }
      );
    }
  }

  if (discount?._id) {
    // Fetch the discount directly from the database
    const currentDiscount = await Discount.findById(discount._id);

    if (!currentDiscount) {
      return NextResponse.json(
        { error: "Discount not found." },
        { status: 404 }
      );
    }

    // Validate the discount
    const isActive =
      currentDiscount.startDateTime < Date.now() &&
      (currentDiscount.endDateTime > Date.now() ||
        currentDiscount.endDateTime === null);

    const meetsRequirements =
      currentDiscount.requirmentType === "none" ||
      (currentDiscount.requirmentType === "quantity" &&
        cart.totalQuantity >= currentDiscount.minimumQuantity) ||
      (currentDiscount.requirmentType === "amount" &&
        cart.totalAmount >= currentDiscount.minimumAmount);

    const hasRemainingUses =
      currentDiscount.isLimit === false ||
      currentDiscount.limitNumber === null ||
      currentDiscount.used < currentDiscount.limitNumber;

    if (!isActive || !meetsRequirements || !hasRemainingUses) {
      return NextResponse.json(
        { error: "The discount code is not valid or cannot be used." },
        { status: 400 }
      );
    }

    // Increment the used count if valid
    try {
      await Discount.findByIdAndUpdate(
        discount._id,
        { $inc: { used: 1 } },
        { new: true }
      );
    } catch (error) {
      console.log("Error updating discount:", error);
      return NextResponse.json(
        { error: "Failed to update discount usage." },
        { status: 500 }
      );
    }
  }

  try {
    const order = new Order({
      ...body,
      address: {
        name: address.name,
        instagram: address.instagram,
        email: address.email,
        number: address.number,
        zone: address.zone,
        city: address.city,
        streetName: address.streetName,
        building: address.building,
        floor: address.floor,
        apartment: address.apartment,
      },

      discount: {
        _id: discount?._id,
        type: discount?.type,
        amount: discount?.amount,
        title: discount?.title,
      },

      cart: {
        items: JSON.stringify(cart.items),
        totalAmount: cart.totalAmount,
        totalQuantity: cart.totalQuantity,
        shipping: cart.shipping,
      },
    });

    const createdOrder = await order.save();

    await transporter.sendMail({
      ...mailOptions,

      subject: "New Order",
      text: `New order from ${order.address.name}`,
    });

    if (address.email.lenght != 0) {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: address.email,
        subject: "Order Confirmation",
        text: `Order Confirmation`,
        html: generateMail(order),
      });
    }

    return NextResponse.json({ message: "orderedd ya negm" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
};

export const PUT = async (req) => {
  try {
    const orderIds = await req.json();

    try {
      connectDB();
      const res = await Order.updateMany(
        { _id: { $in: orderIds } },
        {
          $set: {
            status: true,
          },
        }
      );
      return NextResponse.json(res);
    } catch (error) {
      return NextResponse.json(error);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
};

export const DELETE = async (req) => {
  connectDB();
  try {
    const body = await req.json();

    const result = await Order.deleteMany({ _id: { $in: body } });
    console.log(body);

    return NextResponse.json({ message: result });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};
