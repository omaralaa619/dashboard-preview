import connectDB from "@/lib/connectDB";
import Discount from "@/models/discountModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  let numberApplicable = 0;
  const productsToDiscount = [];
  try {
    await connectDB();

    const { totalQuantity, totalAmount, cart } = await req.json();
    const discounts = await Discount.find({ method: "automatic" }).sort({
      _id: -1,
    });

    const filteredDiscounts = discounts.filter((item) => {
      return (
        (item.startDateTime < Date.now() &&
          (item.endDateTime > Date.now() || item.endDateTime === null) &&
          item.requirmentType == "none") ||
        (item.requirmentType == "quantity" &&
          totalQuantity >= item.minimumQuantity) ||
        (item.requirmentType == "amount" && totalAmount >= item.minimumAmount)
      );
    });
    console.log("length", filteredDiscounts.length);
    console.log(filteredDiscounts);

    const discount = filteredDiscounts[0];
    console.log("discount", discount);
    let discountAmount;
    let discountTitle;

    if (filteredDiscounts.length > 0) {
      if (discount.valueType == "percentage") {
        discountAmount = (discount.value / 100) * totalAmount;
      } else {
        discountAmount = discount.value;
      }

      if (discount.method == "code") {
        discountTitle = discount.code;
      } else {
        discountTitle = discount.name;
      }
    }

    if (discount.discountType == "xy") {
      ////////////////////////////////////////////////////

      const productsXquantity = discount.productsX.quantity;
      const productsYquantity = discount.productsY.quantity;
      const productsX = discount.productsX.products;
      const productsY = discount.productsY.products;

      const cartProducts = cart.items;

      // console.log("ProductsX", productsX);
      // console.log("ProductsX quantity:", productsXquantity);
      // console.log("ProductsY:", productsY);
      // console.log("ProductsY quantity:", productsYquantity);
      console.log("Cart products:", cartProducts);

      // Count how many cartProducts are actually in productsX, considering quantity
      const productsXIds = productsX.map((p) =>
        p._id ? p._id.toString() : p.id
      );
      const cartProductsInX = cartProducts.filter((item) =>
        productsXIds.some((baseId) => item.id.startsWith(baseId))
      );
      const countInProductsX = cartProductsInX.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );

      // Count how many cartProducts are actually in productsY, considering quantity
      const productsYIds = productsY.map((p) =>
        p._id ? p._id.toString() : p.id
      );
      const cartProductsInY = cartProducts.filter((item) =>
        productsYIds.some((baseId) => item.id.startsWith(baseId))
      );
      const countInProductsY = cartProductsInY.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );

      console.log(productsXIds);
      console.log(
        "Count of cart products in productsX (with quantity):",
        countInProductsX
      );
      console.log(productsYIds);
      console.log(
        "Count of cart products in productsY (with quantity):",
        countInProductsY
      );

      // Calculate how many times the discount can be applied
      if (countInProductsX < productsXquantity) {
        return NextResponse.json(
          {
            error: `Discount is not applicable.`,
          },
          { status: 400 }
        );
      }
      if (countInProductsY < productsYquantity) {
        return NextResponse.json(
          {
            error: `Discount is not applicable.`,
          },
          { status: 400 }
        );
      }
      if (countInProductsX > 0 && countInProductsY > 0) {
        numberApplicable = Math.min(
          Math.floor(countInProductsX / productsXquantity),
          Math.floor(countInProductsY / productsYquantity)
        );
      }
      let productsYToDiscount = numberApplicable * productsYquantity;
      // Find the cheapest products of productsY in the cart to discount and push them to productsToDiscount
      // Flatten productsY in cart to individual items (consider quantity)
      let productsYCartItems = [];
      cartProductsInY.forEach((item) => {
        const qty = item.quantity || 1;
        for (let i = 0; i < qty; i++) {
          productsYCartItems.push(item);
        }
      });

      // Sort by price ascending
      productsYCartItems.sort((a, b) => (a.price || 0) - (b.price || 0));

      // Push the cheapest productsYToDiscount items to productsToDiscount
      for (
        let i = 0;
        i < productsYToDiscount && i < productsYCartItems.length;
        i++
      ) {
        productsToDiscount.push(productsYCartItems[i]);
      }

      discountAmount = productsToDiscount.reduce(
        (sum, item) => sum + (item.price || 0),
        0
      );

      console.log(
        "Number of times the discount can be applied:",
        numberApplicable
      );
      console.log("Products to discount:", productsToDiscount);

      console.log(
        "Discount amount after applying products to discount:",
        discountAmount
      );
    }

    ////////////////////////////////////////////////////

    if (filteredDiscounts.length > 0) {
      return NextResponse.json([
        {
          _id: discount._id,
          type: discount.discountType,
          amount: discountAmount,
          title: discountTitle,
          numbersApplicable: numberApplicable,
          productsToDiscount: (() => {
            // Group by full id (including suffixes) and filter to unique id+suffix pairs
            const idQtyMap = new Map();
            productsToDiscount.forEach((item) => {
              idQtyMap.set(item.id, (idQtyMap.get(item.id) || 0) + 1);
            });
            return Array.from(idQtyMap.entries()).map(([id, qty]) => ({
              id,
              qty,
            }));
          })(),
        },
      ]);
    }

    if (filteredDiscounts.length <= 0) {
      return NextResponse.json(null);
    }
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};
