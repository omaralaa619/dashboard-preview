import React from "react";
import Button from "../UI/Button";
import Link from "next/link";

const TextSection = () => {
  return (
    <div className="bg-sec text-center py-12 px-7 mb-10">
      <p className="text-5xl mb-10 font-medium">First Drop Live Now</p>

      <p className="mb-5 text-xs">
        Explore our first collection. Timeless pieces, thoughtfully crafted.
      </p>
      <Link href={"category/featured"}>
        <Button
          className={
            "bg-buttonSec rounded-sm border border-buttonSec text-white hover:bg-white hover:text-buttonSec transition-colors duration-300 mb-5"
          }
        >
          Shop Now
        </Button>
      </Link>
    </div>
  );
};

export default TextSection;
