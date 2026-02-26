import { generateContactMail } from "@/lib/GenerateContactMail";
import { transporter } from "@/lib/nodemailer";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  console.log("body", body);

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Contact Message",
      html: generateContactMail(body.data),
    });

    console.log(body);

    return NextResponse.json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.log(error);
    return new Response(error);
  }
};
