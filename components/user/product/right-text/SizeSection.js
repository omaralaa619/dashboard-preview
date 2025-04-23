import CloseX from "@/svgs/CloseX";
import { X } from "lucide-react";
import React, { useEffect } from "react";

const SizeSection = ({ stock, size, setSize }) => {
  useEffect(() => {
    const inittsize = stock.find((size) => size.available > 0);

    console.log(inittsize);

    if (inittsize) {
      setSize(inittsize.optionName);
    } else {
      setSize("");
    }
  }, []);

  const sizeHandler = (e) => {
    console.log(e.target.value);
    setSize(e.target.value);
  };

  ////////////  border if size is selected ////////////////
  const borderStyle = (label) => {
    return label === size;
  };

  //////////////////  check if size is available  /////////////////////
  const sizeAvailable = (inputSize) => {
    const size = stock.find((stock) => stock.optionName === inputSize);
    return size.available <= 0;
  };

  return (
    <div
      onChange={sizeHandler}
      className="flex flex-wrap gap-3 justify-center "
    >
      {stock.map((size) => (
        <label
          key={size.optionName}
          className={`${
            borderStyle(size.optionName)
              ? "bg-prim text-white"
              : "bg-white text-black hover:bg-neutral-100 transition-colors duration-300"
          } ${sizeAvailable(size.optionName) ? "pointer-events-none" : ""} relative py-3  rounded-sm border w-14 text-center  cursor-pointer`}
        >
          <div
            className={`${
              sizeAvailable(size.optionName) ? "" : "hidden"
            } absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] fill-slate-400  w-full h-full bg-neutral-400/10 flex items-center justify-center`}
          >
            <X size={40} strokeWidth={1} color="#b1b0af" />
          </div>
          <input
            type="radio"
            name="size"
            value={size.optionName}
            className="hidden"
          />
          {size.optionName}
        </label>
      ))}
    </div>
  );
};

export default SizeSection;
