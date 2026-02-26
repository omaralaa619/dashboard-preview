"use client";
import ArrowForwardSVG from "@/svgs/ArrowForwardSVG";
import CloseX from "@/svgs/CloseX";
import { motion } from "framer-motion";

import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/store/ui-store";
import { Instagram, X } from "lucide-react";
import TiktokSVG from "@/svgs/TiktokSVG";
import WhatsappSVG from "@/svgs/WhatsappSVG";
import FacebookSVG from "@/svgs/FacebookSVG";
import { TransitionLink } from "../ui/TransitionLink";
import Link from "next/link";

const MobileNavlinks = () => {
  const { data: session } = useSession();

  const navOpen = useSelector((state) => state.ui.navOpen);
  const categories = useSelector((state) => state.ui.collections);

  const dispatch = useDispatch();
  const toggleNavHandler = () => {
    dispatch(uiActions.toggleNav());
  };

  return (
    <>
      <motion.div
        className={
          "bg-black top-0 left-0 h-[100vh] w-full fixed opacity-30 z-40  md:hidden"
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
        animate={navOpen ? { height: "75vh" } : { height: 0 }}
        transition={{ delay: 0.2 }}
        className=" rounded-xl text-xl flex flex-col fixed left-1/2 -translate-x-1/2  bottom-2 md:hidden bg-white h-[70vh] text-black w-[95%] z-50 "
      >
        <div
          className="flex flex-col justify-between h-full p-6 "
          onClick={() => console.log(categories)}
        >
          <motion.div
            initial={false}
            onClick={toggleNavHandler}
            className="absolute font-medium bg-white left-1/2 -translate-x-1/2 -top-16 rounded-full w-[48px] h-[48px] flex justify-center items-center cursor-pointer shadow-lg"
            animate={
              navOpen ? { opacity: 1 } : { opacity: 0, pointerEvents: "none" }
            }
          >
            <X size={24} />
          </motion.div>

          <motion.div
            initial={false}
            className={`overflow-y-scroll`}
            animate={navOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={
              navOpen ? { delay: 0.5, duration: 0.3 } : { duration: 0.3 }
            }
          >
            <TransitionLink href={"/"} className="text-blackblack">
              <p onClick={toggleNavHandler} className="py-2 ">
                Home
              </p>
            </TransitionLink>

            <TransitionLink
              href={"/collections/shop-all"}
              className="text-black"
            >
              <p onClick={toggleNavHandler} className="py-2 ">
                Shop All
              </p>
            </TransitionLink>

            {categories && (
              <>
                {categories.map((cat) => (
                  <TransitionLink
                    href={`/collections/${cat.slug}`}
                    className="text-black"
                    key={cat.slug}
                  >
                    <p onClick={toggleNavHandler} className="py-2 ">
                      {cat.title}
                    </p>
                  </TransitionLink>
                ))}
              </>
            )}

            <Link href={"/dashboard"}>
              <p
                onClick={toggleNavHandler}
                className={`py-2 border-b pl-2  border-white/50 text-black ${
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
            <div className="pt-2 border-t border-neutral-200">
              <p className="text-xs font-medium">Rose</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default MobileNavlinks;
