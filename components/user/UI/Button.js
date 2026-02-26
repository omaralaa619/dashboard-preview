import React from "react";

const Button = ({ text, onclick, className }) => {
  return (
    <button
      onClick={onclick}
      className={` text-center rounded-full w-[100%] md:px-20 py-3  hover:opacity-70 hover:text-black transition-opacity duration-300 md:w-auto ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
