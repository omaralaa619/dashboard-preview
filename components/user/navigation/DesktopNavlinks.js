"use client";
import ArrowForwardSVG from "@/svgs/ArrowForwardSVG";
import CloseX from "@/svgs/CloseX";
import { motion } from "framer-motion";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/store/ui-store";
import { Instagram, X } from "lucide-react";
import TiktokSVG from "@/svgs/TiktokSVG";
import WhatsappSVG from "@/svgs/WhatsappSVG";
import FacebookSVG from "@/svgs/FacebookSVG";
import { useEffect } from "react";
import { TransitionLink } from "../ui/TransitionLink";

const DesktopNavlinks = () => {
  const { data: session } = useSession();

  const navOpen = useSelector((state) => state.ui.navOpen);
  const categories = useSelector((state) => state.ui.collections);

  const dispatch = useDispatch();
  const toggleNavHandler = () => {
    dispatch(uiActions.toggleNav());
  };

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [navOpen]);
  return (
    <>
      <motion.div
        className={
          "bg-black top-0 left-0 h-[100vh] w-full fixed opacity-30 z-40 hidden md:block"
        }
        onClick={toggleNavHandler}
        initial={false}
        animate={
          navOpen
            ? { opacity: 0.5, pointerEvents: "all" }
            : { opacity: 0, pointerEvents: "none" }
        }
        transition={navOpen ? { delay: 0.2 } : { delay: 0.5 }}
      ></motion.div>

      {/* actual nav */}
      <motion.div
        initial={false}
        animate={navOpen ? { width: 400 } : { width: 0 }}
        transition={{ delay: 0.2 }}
        className={` rounded-xl text-2xl md:flex flex-col fixed left-4 top-1/2 -translate-y-1/2  bottom-2 hidden bg-white h-[95vh] text-black w-[400px] z-50 ${
          navOpen ? "" : "pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-between h-full p-8">
          <motion.div
            initial={false}
            onClick={toggleNavHandler}
            className=" font-medium bg-white  rounded-full w-[48px] min-h-[48px] flex justify-center items-center cursor-pointer border border-neutral-300 mb-4"
            animate={navOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <X size={18} strokeWidth={2} />
          </motion.div>
          <motion.div
            initial={false}
            className={`overflow-y-scroll  h-full `}
            animate={navOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={
              navOpen ? { delay: 0.5, duration: 0.3 } : { duration: 0.3 }
            }
          >
            <TransitionLink href={"/"}>
              <p
                onClick={toggleNavHandler}
                className="w-fit py-2 relative after:block after:h-[1px] after:w-full after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-in-out after:origin-left group-hover:after:scale-x-100"
              >
                Home
              </p>
            </TransitionLink>
            <TransitionLink href={"/collections/shop-all"}>
              <p
                onClick={toggleNavHandler}
                className="w-fit py-2 relative after:block after:h-[1px] after:w-full after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-in-out after:origin-left group-hover:after:scale-x-100"
              >
                Shop All
              </p>
            </TransitionLink>

            {categories && (
              <>
                {categories.map((cat) => (
                  <TransitionLink
                    href={`/collections/${cat.slug}`}
                    className="text-black group"
                    key={cat.slug}
                  >
                    <p
                      onClick={toggleNavHandler}
                      className="w-fit py-2 relative after:block after:h-[1px] after:w-full after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-in-out after:origin-left group-hover:after:scale-x-100"
                    >
                      {cat.title}
                    </p>
                  </TransitionLink>
                ))}
              </>
            )}

            <TransitionLink href={"/"} className="text-blackblack group">
              <p
                onClick={toggleNavHandler}
                className="w-fit py-2 relative after:block after:h-[1px] after:w-full after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-in-out after:origin-left group-hover:after:scale-x-100"
              >
                Contact Us
              </p>
            </TransitionLink>

            <Link href={"/dashboard"} className="group">
              <p
                onClick={toggleNavHandler}
                className={`w-fit py-2 border-b pl-2  border-white/50 text-black relative after:block after:h-[1px] after:w-full after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-in-out after:origin-left after:origin-left group-hover:after:scale-x-100 ${
                  !session ? "hidden" : ""
                }`}
              >
                DASHBOARD
              </p>
            </Link>
          </motion.div>

          {/* socials  */}
          <motion.div
            initial={false}
            animate={navOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={
              navOpen ? { delay: 0.5, duration: 0.3 } : { duration: 0.3 }
            }
          >
            <div className="flex gap-6  py-6 items-center">
              <FacebookSVG />
              <Instagram size={25} />
              <TiktokSVG />
              <WhatsappSVG />
            </div>
            <div className={`pt-2 border-t border-neutral-200 `}>
              <p className="text-xs font-medium">Rose</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default DesktopNavlinks;
