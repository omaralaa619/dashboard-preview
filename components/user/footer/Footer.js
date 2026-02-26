"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "../ui/Container";
import LogoSVG from "@/svgs/LogoSVG";
import { useState } from "react";
import { ChevronRight, Instagram } from "lucide-react";
import FacebookSVG from "@/svgs/FacebookSVG";
import TiktokSVG from "@/svgs/TiktokSVG";
import WhatsappSVG from "@/svgs/WhatsappSVG";
import { TransitionLink } from "../ui/TransitionLink";

const Footer = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState("");

  return (
    <Container
      className={` py-12 ${
        pathname == "/checkout/delivery-info" ? "hidden" : ""
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-24">
        {/* logo newsletter */}
        <div>
          <img
            src="https://nodika-nd.com/cdn/shop/files/Nodika_logo_png_copy.png?v=1710992994&width=240"
            alt=""
            className="w-[170px] md:w-[170px] invert"
          />
          <p onClick={() => console.log(email)} className="pt-8 pb-6 text-2xl">
            Sign up for new stories and personal offers
          </p>

          <div className="groupp">
            <input
              className={`inputt ${email != "" ? "filled" : ""}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="labell">E-mail</label>
            <div className="absolute -translate-y-1/2 top-1/2 right-4 p-1 bg-neutral-200 rounded-full hover:bg-black group">
              <ChevronRight
                size={14}
                className="stroke-black group-hover:stroke-white transition-colors"
              />
            </div>
          </div>
        </div>

        {/* About us working hours */}
        <div className="text-sm md:text-base flex flex-col gap-3 text-neutral-500">
          <p className="font-bold text-black ">About us</p>
          <p>
            What you wear is how you present yourself to the world, especially
            today, NODIKA Is your fashion.
          </p>

          <p className="font-bold"> Contact Us:</p>
          <p className="underline underline-offset-4">+2 0100 115 1193</p>

          <p className="font-bold">Location:</p>
          <p>
            New Cairo , Behind AUC Housing, Block 38, Building 83, no.1 ground
            floor.
          </p>

          <p className="underline underline-offset-4">
            PRESS ON GOOGLE MAPS LINK
          </p>
          <p className="font-bold">Working Hours:</p>
          <p>Hours: 12 PM–9 PM</p>
        </div>

        {/* Links */}
        <div className=" flex flex-col gap-2 text-sm md:text-base">
          <TransitionLink className="text-neutral-500" href={"/contact"}>
            Contact
          </TransitionLink>
          <TransitionLink className="text-neutral-500" href={"/refund-policy"}>
            Refund Policy
          </TransitionLink>
          <TransitionLink className="text-neutral-500" href={"/privacy-policy"}>
            Privacy Policy
          </TransitionLink>
          <TransitionLink
            className="text-neutral-500"
            href={"/terms-conditions"}
          >
            Terms of Service
          </TransitionLink>
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-10 md:mt-10">
        <div className="flex gap-6   items-center">
          <FacebookSVG s />
          <Instagram size={25} />
          <TiktokSVG />
          <WhatsappSVG />
        </div>
        <p className="text-xs md:text-sm text-neutral-500">
          © 2025, Nodika. Powered by bktvty
        </p>
      </div>
    </Container>
  );
};

export default Footer;
