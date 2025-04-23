"use client";
import Image from "next/image";
import Link from "next/link";

const Categories = ({ categories }) => {
  return (
    <div className="bg-cover bg-center ">
      <div className="px-6 max-w-7xl m-auto  text-black ">
        <h1 className="text-center pt-12 text-2xl font-medium ">
          Shop by collection
        </h1>

        <div className="grid  grid-cols-1 md:grid-cols-3 gap-3 mt-10 text-center  md:gap-8 ">
          {categories.map((category) => (
            <Link href={`category/${category.slug}`} key={category.title}>
              <div className="mb-8">
                <div className="relative bg-neutral-300 aspect-[4/4] rounded-sm overflow-hidden">
                  <Image
                    fill
                    className="object-cover object-center z-0 hover:scale-110 transition-transform duration-3000 ease-linear"
                    src={category.imageUrl}
                    alt="category image"
                  />
                </div>
                <p className="font-medium mt-2">{category.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
