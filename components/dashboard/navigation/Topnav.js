"use client";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { adminUiActions } from "@/store/admin-ui-store";
import ComboBox from "../UI/ComboBox";
import classes from "./Topnav.module.css";
import SignoutSVG from "@/svgs/SignoutSVG";

import SunSVG from "@/svgs/SunSVG";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import ThawbSVG from "@/svgs/ThawbSVG";
import ThemeButton from "./ThemeButton";
import Banner from "../UI/Banner";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Topnav = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const signOutHandler = () => {
    signOut();
    router.push("/");
  };

  const navOpen = useSelector((state) => state.adminUi.navOpen);

  const toggleNav = () => {
    dispatch(adminUiActions.toggleNav());
    console.log(navOpen);
  };

  const closeNav = () => {
    dispatch(adminUiActions.closeNav());
    console.log(navOpen);
  };

  const [hidden, setHidden] = useState(false);

  /// removee

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    if (latest > prev && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const variants = {
    visible: { y: 0 },
    hidden: { y: "-100%" },
  };
  const dropownItems = [
    {
      title: "Signout",
      svg: <SignoutSVG />,
      action: signOutHandler,
    },
  ];

  const Circle = () => {
    return <div className={classes.circle}></div>;
  };

  return (
    <motion.div
      variants={variants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={classes.root}
    >
      <div className={classes.main}>
        <motion.div className={classes.burger} onClick={toggleNav}>
          <motion.div
            className={classes.line1}
            animate={navOpen ? { rotate: -45, y: 8 } : { rotate: 0 }}
            transition={{
              type: "tween",
            }}
          ></motion.div>
          <motion.div
            animate={navOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ type: "tween", duration: 0.1 }}
            className={classes.line2}
          ></motion.div>
          <motion.div
            animate={navOpen ? { rotate: 45, y: -5 } : { rotate: 0 }}
            transition={{
              type: "tween",
            }}
            className={classes.line3}
          ></motion.div>
        </motion.div>

        <ComboBox
          title={"User"}
          titleSVG={<Circle />}
          dropdownItems={dropownItems}
          gap={"64px"}
          className={classes.comboBox}
        />

        {/* <p className={classes.date}>4 January 2025</p> */}

        <div className={classes.mobileLogo}>
          <p className="text-2xl">DASHBOARD</p>
        </div>

        <ThemeButton />
      </div>
      <Banner />
    </motion.div>
  );
};

export default Topnav;
