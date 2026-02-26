import connectDB from "@/lib/connectDB";
import Newsletter from "@/models/newsletterModel";

import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { nid } = params;
  console.log(nid);
  try {
    connectDB();

    const newsletter = await Newsletter.findById(nid);

    return NextResponse.json(newsletter);
  } catch (error) {
    return NextResponse.json(error);
  }
};
