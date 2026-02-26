import Price from "../../product/Price";

const PriceSection = ({ price, compareAtPrice, totalStock }) => {
  return (
    <div className="w-full mt-5">
      {compareAtPrice != 0 && (
        <div className="flex gap-2  mb-2">
          <div className="relative w-fit ">
            <Price number={compareAtPrice} />
            <div className="w-full h-[1px] bg-black absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
          </div>

          <p className=" text-red-600 border border-red-600 top-1 left-1 px-2 py-1 text-xs tracking-tighter font-medium">
            SAVE {Math.round(((compareAtPrice - price) / price) * 100)}%
          </p>
        </div>
      )}

      <div className="flex gap-2 items-center ">
        <Price
          number={price}
          className={`${
            compareAtPrice ? "text-red-600" : "text-black"
          } text-lg  md:text-xl`}
        />
        {totalStock <= 0 && (
          <div className="bg-prim_dark text-white text-xs py-1 px-2 rounded-xl">
            Sold out
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceSection;
