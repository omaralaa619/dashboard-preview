import { formatter } from "@/lib/utils";

const Price = ({ number, className }) => {
  const num = formatter(number);
  return <p className={className}>LE {num}</p>;
};

export default Price;
