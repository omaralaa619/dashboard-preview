import ArrowForwardSVG from "@/svgs/ArrowForwardSVG";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Link from "next/link";

const MobileShop = ({ open, setOpen, closeHandler }) => {
  const categories = useSelector((state) => state.ui.store.categories);

  return (
    <div className="py-4 border-b pl-2 border-white/50">
      <div
        onClick={() => setOpen(!open)}
        className=" flex fill-white gap-4 items-center"
      >
        <p>SHOP</p>
        <motion.div
          animate={open ? { rotate: 90 } : { rotate: 0 }}
          transition={{
            type: "tween",
          }}
        >
          <ArrowForwardSVG />
        </motion.div>
      </div>

      {categories && (
        <motion.div
          className="ml-4"
          animate={
            open
              ? { opacity: 1, marginTop: 16 }
              : { opacity: 0, height: 0, pointerEvents: "none" }
          }
          transition={{
            type: "tween",
          }}
        >
          {categories.map((item) => (
            <Link href={`/category/${item.slug}`} key={item.title}>
              <p
                className="py-4 border-t border-white/25 text-white"
                onClick={closeHandler}
              >
                {item.title}
              </p>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MobileShop;
