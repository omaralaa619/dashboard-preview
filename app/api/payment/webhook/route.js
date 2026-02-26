import connectDB from "@/lib/connectDB";
import Discount from "@/models/discountModel";
import Order from "@/models/ordersModel";
import Product from "@/models/productsModel";
import { NextResponse } from "next/server";
import { mailOptions, transporter } from "../../../../lib/nodemailer";

import { generateMail } from "@/lib/mailGenerator";
import he from "he";

export const POST = async (req) => {
  console.log("webhook runningg");
  //   const products = await Product.find().lean();

  const body = await req.json();

  if (body.type !== "TRANSACTION" || body.obj.success !== true) {
    return NextResponse.json(
      { message: "Not a successful payment." },
      { status: 400 }
    );
  }
  connectDB();

  console.log("paymob returned body ", body);
  console.log("paymob orderrr  dataaaaaaaaaaaaaaa ", body.obj.order);
  const data = body.obj.order;

  const cartItemsBefore = data.items.slice(0, data.items.length - 2);
  const info = data.shipping_data;

  const cartItems = cartItemsBefore.map((item) => {
    const encodedDescription = item.description;
    const decodedDescription = he.decode(encodedDescription);
    const extraData = JSON.parse(decodedDescription);

    return {
      id: extraData.id,
      price: item.amount_cents / 100,
      quantity: item.quantity,
      totalPrice: (item.amount_cents / 100) * item.quantity,
      size: extraData.size,
      title: item.name,
      image: extraData.image,
    };
  });
  const discount = body.obj.payment_key_claims.extra.discount;
  let discountNumber;
  if (discount) {
    discountNumber = discount.amount;
    if (discount.type == "shipping") {
      shippingNumber = 0;
    }
  } else {
    discountNumber = 0;
  }
  const cart = {
    items: cartItems,
    totalAmount:
      (data.amount_cents +
        discountNumber * 100 -
        data.items[data.items.length - 2].amount_cents) /
      100,
    totalQuantity: 10,
    shipping: data.items[data.items.length - 2].amount_cents / 100,
  };

  const address = {
    name: info.first_name,
    instagram: "",
    email: info.email,
    number: info.phone_number,
    zone: info.state,
    city: info.city,
    streetName: info.street,
    building: info.building,
    floor: info.floor,
    apartment: info.apartment,
  };

  console.log("cart paymob", cart);
  console.log("address paymob", address);
  console.log("address paymob", discount);

  //////////////////////////////////////////////////////////////////

  const products = await Product.find().lean();

  for (const item of cart.items) {
    const id = item.id.slice(0, -item.size.length);
    const currentProduct = products.find((pro) => pro._id == id);

    console.log(currentProduct);

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

  // Increment the used count if valid

  if (discount?._id) {
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
      payment: {
        paymentType: "visa",
        paymentDetails: body.obj.id,
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
