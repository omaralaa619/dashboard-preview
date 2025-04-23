import ArrowForwardSVG from "@/svgs/ArrowForwardSVG";
import CloseX from "@/svgs/CloseX";
import { motion } from "framer-motion";
import MobileShop from "./MobileShop";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const MobileNavlinks = ({ open, setOpen }) => {
  const [shopOpen, setShopOpen] = useState(false);
  const { data: session } = useSession();

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <>
      <motion.div
        className={
          open
            ? "bg-black top-0 left-0 h-[100vh] w-full absolute  z-10"
            : "hidden"
        }
        onClick={closeHandler}
        initial={false}
        animate={open ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{
          type: "tween",
        }}
      ></motion.div>
      <motion.div
        initial={{ left: "-100%" }}
        animate={open ? { left: 0 } : { left: "-100%" }}
        className="flex flex-col absolute  top-0 md:hidden bg-acc h-[100vh] text-white w-[300px] z-10"
      >
        <div className=" flex flex-col">
          <div onClick={closeHandler} className="fill-white   m-4 ">
            <CloseX />
          </div>

          <div className="px-4">
            <Link href={"/"}>
              <p
                onClick={closeHandler}
                className="py-4 border-b pl-2  border-white/50 text-white"
              >
                HOME
              </p>
            </Link>
            <MobileShop
              open={shopOpen}
              setOpen={setShopOpen}
              closeHandler={closeHandler}
            />
            <Link href={"/contact"}>
              <p
                onClick={closeHandler}
                className="py-4 border-b pl-2  border-white/50 text-white"
              >
                Contact
              </p>
            </Link>
            <Link href={"/dashboard"}>
              <p
                onClick={closeHandler}
                className={`py-4 border-b pl-2  border-white/50 text-white ${
                  !session ? "hidden" : ""
                }`}
              >
                DASHBOARD
              </p>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MobileNavlinks;
