import connectDB from "@/lib/connectDB";
import Discount from "@/models/discountModel";
import Product from "@/models/productsModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const paymobPublic = process.env.PAYMOB_PUBLIC;
  const paymobSecret = process.env.PAYMOB_SECRET;
  const paymobApi = process.env.PAYMOB_API;
  connectDB();

  const body = await req.json();
  const products = await Product.find().lean();
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
  }

  let discountNumber;
  let shippingNumber = cart.shipping;
  if (discount) {
    discountNumber = discount.amount;
    if (discount.type == "shipping") {
      shippingNumber = 0;
    }
  } else {
    discountNumber = 0;
  }
  console.log("discountttt", discount);
  console.log("discountttt", discountNumber);

  const itemsMod = cart.items.map((item) => ({
    name: item.title,
    amount: item.price * 100,
    description: JSON.stringify({
      id: item.id,
      size: item.size,
      image: item.image,
      totalPrice: item.totalPrice,
    }),
    quantity: item.quantity,
  }));

  const additionalItems = [
    {
      name: "Shipping Fee",
      amount: shippingNumber * 100,
      description: "Shipping cost",
      quantity: 1,
    },
    {
      name: "Discount",
      amount: -discountNumber * 100, // negative value for discount
      description: "Applied discount",
      quantity: 1,
    },
  ];

  try {
    const response = await fetch("https://accept.paymob.com/v1/intention/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${paymobSecret}`,
      },
      body: JSON.stringify({
        amount: (cart.totalAmount + shippingNumber - discountNumber) * 100,
        currency: "EGP",
        payment_methods: [5083172],
        items: [...itemsMod, ...additionalItems],
        billing_data: {
          apartment: address.apartment,
          first_name: address.name,
          last_name: ".",
          street: address.streetName,
          building: address.building,
          phone_number: address.number,
          city: address.city,
          country: "dumy",
          email: address.email,
          floor: address.floor,
          state: address.zone,
          extra_description: "extra description",
        },
        extras: { discount: discount },

        expiration: 3600,
        notification_url: "https://thawb.vercel.app/api/payment/webhook",
        redirection_url: "https://thawb.vercel.app/checkout/completed",
      }),
    });

    const { client_secret } = await response.json();
    const link = `https://accept.paymob.com/unifiedcheckout/?publicKey=${paymobPublic}&clientSecret=${client_secret}`;

    return NextResponse.json({ link });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error });
  }
};
