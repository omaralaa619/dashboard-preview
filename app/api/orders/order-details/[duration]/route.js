import Order from "@/models/ordersModel";
import connectDB from "@/lib/connectDB";

import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const duration = params.duration;

  try {
    connectDB();
    const date = new Date();
    date.setDate(date.getDate() + 1);
    console.log(date.toLocaleDateString());
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - duration);

    let groupDay = "$date";
    let projectDay = "$_id.day";
    let timeInterval = 1;
    let currentTime = new Date();

    if (duration == 365) {
      groupDay = null;
      projectDay = 1;
      timeInterval = 32;
    }

    const orders = await Order.aggregate([
      {
        $match: {
          date: { $gte: fromDate, $lte: date },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: groupDay },
          },
          count: {
            $sum: 1,
          },
          totalAmount: {
            $sum: "$cart.totalAmount",
          },
          avgSales: {
            $avg: "$cart.totalAmount",
          },
        },
      },
      {
        $project: {
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: projectDay,
            },
          },
          totalAmount: 1,
          count: 1,
          avgSales: 1,
          _id: 0,
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ]);

    const dateList = [];
    let currentDate = new Date(fromDate);

    if (duration == 365) {
      currentDate.setMonth(currentDate.getMonth() + 1);
      while (currentDate < date) {
        currentDate.setDate(1);
        dateList.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + timeInterval);
      }
    } else {
      while (currentDate < date) {
        dateList.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + timeInterval);
      }
    }

    const resultObject = [];
    dateList.forEach((d) => {
      const foundOrder = orders.find(
        (order) => order.date.toDateString() == d.toDateString()
      ) || {
        date: d,
        count: 0,
        totalAmount: 0,
        avgSales: 0,
      };
      resultObject.push({
        date: foundOrder.date,
        count: foundOrder.count,
        totalAmount: foundOrder.totalAmount,
        avgSales: foundOrder.avgSales,
      });
    });

    return NextResponse.json(resultObject);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
