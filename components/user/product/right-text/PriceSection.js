import Price from "../../UI/Price";

const PriceSection = ({ price, compareAtPrice }) => {
  return (
    <div className="w-full">
      {compareAtPrice != 0 && (
        <div className="flex gap-2 justify-center mb-2">
          <div className="relative w-fit ">
            <Price number={compareAtPrice} />
            <div className="w-full h-[1px] bg-black absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
          </div>

          <p className=" text-red-600 border border-red-600 top-1 left-1 px-2 py-1 text-xs tracking-tighter font-medium">
            SAVE {Math.round(((compareAtPrice - price) / price) * 100)}%
          </p>
        </div>
      )}
      <Price
        number={price}
        className={`${
          compareAtPrice ? "text-red-600" : "text-black"
        } text-lg font-medium`}
      />
    </div>
  );
};

export default PriceSection;
