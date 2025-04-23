import Image from "next/image";
import Price from "../UI/Price";
import Link from "next/link";

const ProductItem = ({ product }) => {
  const { price, compareAtPrice, stock } = product;

  return (
    <Link href={`/product/${product.slug}`}>
      <div>
        <div className="h-full w-full relative aspect-[4/6] mb-2">
          <Image
            fill
            className="object-cover object-center "
            src={product.imageUrls[0]}
            alt="category image"
            loading="eager"
          />
          {compareAtPrice != 0 && (
            <p className="absolute text-white bg-red-600 top-1 left-1 px-2 py-1 text-xs">
              Save {Math.round(((price - compareAtPrice) / price) * 100)}%
            </p>
          )}
          {stock.reduce((acc, obj) => acc + obj.available, 0) === 0 && (
            <p className="absolute text-white bg-black top-1 right-1 px-2 py-1 text-xs">
              Sold Out
            </p>
          )}
        </div>

        <div className="text-center ">
          <p className="">{product.title}</p>

          <Price
            number={price}
            className={`${compareAtPrice ? "text-red-600" : "text-black"}`}
          />
          {compareAtPrice > 0 && (
            <div className="w-full  flex justify-center">
              <div className="relative w-fit ">
                <Price number={compareAtPrice} />
                <div className="w-full h-[1px] bg-black absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
