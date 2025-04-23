import connectDB from "@/lib/connectDB";
import Discount from "@/models/discountModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    connectDB();

    const { totalQuantity, totalAmount, code } = await req.json();
    const discounts = await Discount.find({ method: "code", code: code }).sort({
      _id: -1,
    });

    const filteredDiscounts = discounts.filter((item) => {
      const isActive =
        item.startDateTime < Date.now() &&
        (item.endDateTime > Date.now() || item.endDateTime === null);

      const meetsRequirements =
        item.requirmentType === "none" ||
        (item.requirmentType === "quantity" &&
          totalQuantity >= item.minimumQuantity) ||
        (item.requirmentType === "amount" && totalAmount >= item.minimumAmount);

      const hasRemainingUses =
        item.isLimit === false ||
        item.limitNumber === null ||
        item.used < item.limitNumber;

      return isActive && meetsRequirements && hasRemainingUses;
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

    if (filteredDiscounts.length > 0) {
      return NextResponse.json([
        {
          _id: discount._id,
          type: discount.discountType,
          amount: discountAmount,
          title: discountTitle,
        },
      ]);
    }

    if (filteredDiscounts <= 0) {
      return NextResponse.json(null);
    }
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};
