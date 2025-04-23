"use client";
import TiktokSVG from "@/svgs/TiktokSVG";
import { Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const categories = useSelector((state) => state.ui.store.categories);
  return (
    <div className="bg-neutral-900   text-white py-10 px-4 border-t border-neutral-400">
      <div className=" mb-5 md:grid  grid-cols-3">
        <div>
          <p className="text-lg  mb-4">About</p>
          <p className="font-light mb-8 text-neutral-200 md:font-normal">
            Testament is an OS2 Ready Shopify theme with full support for
            Sections Everywhere.
          </p>
        </div>
        <div>
          <p className="text-lg  mb-4">Shop</p>
          {categories && (
            <div className="flex flex-col gap-2 font-light  pb-5 md:font-normal">
              {categories.map((category) => (
                <Link href={`/category/${category.slug}`} key={category.title}>
                  <p className=" underline text-neutral-200">
                    {category.title}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center pb-4 border-b border-white/20">
        <Link
          href={"https://www.instagram.com/lynnenahle/"}
          target="_blank"
          className="!text-white fill-white"
        >
          <Instagram strokeWidth={1.25} color="#ffffff" />
        </Link>
        <Link
          href={"https://www.tiktok.com/@lynnenahle/"}
          target="_blank"
          className="!text-white fill-white"
        >
          <TiktokSVG />
        </Link>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <p className="text-xs   text-center md:font-medium">
          Copyright © 2024 Lynne
        </p>
      </div>
    </div>
  );
};

export default Footer;
