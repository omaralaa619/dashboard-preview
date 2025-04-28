"use client";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { adminUiActions } from "@/store/admin-ui-store";
import NavLink from "./Navlink";

import HomeSVG from "@/svgs/HomeSVG";

import classes from "./Sidebar.module.css";
import OrdersSVG from "@/svgs/OrdersSVG";
import AnalyticsSvg from "@/svgs/AnalyticsSVG";
import ProductsSVG from "@/svgs/ProductsSVG";
import SignoutSVG from "@/svgs/SignoutSVG";
import StoreSVG from "@/svgs/StoreSVG";
import Topnav from "./Topnav";
import { useEffect } from "react";
import DiscountSVG from "@/svgs/DiscountSVG";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Sidebar = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const navOpen = useSelector((state) => state.adminUi.navOpen);
  const { data: session, status } = useSession();

  const closeNavHandler = () => {
    dispatch(adminUiActions.closeNav());
  };

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [navOpen]);

  const routes = [
    {
      href: "/dashboard",
      label: "Home",
      Icon: HomeSVG,
    },
    {
      href: "/dashboard/orders",
      label: "Orders",
      Icon: OrdersSVG,
    },
    {
      href: "/dashboard/analytics",
      label: "Analytics",
      Icon: AnalyticsSvg,
    },
    {
      href: "/dashboard/products",
      label: "Products",
      Icon: ProductsSVG,
    },
    {
      href: "/dashboard/discounts",
      label: "Discounts",
      Icon: DiscountSVG,
    },
    {
      href: "/dashboard/store",
      label: "Store",
      Icon: StoreSVG,
    },
  ];
  return (
    <>
      <motion.div
        onClick={closeNavHandler}
        animate={navOpen ? { opacity: 0.5 } : { opacity: 0 }}
        className={`${classes.fallback} ${
          navOpen ? "" : classes.pointerEvents
        }`}
      ></motion.div>
      <motion.div
        animate={navOpen ? { x: 240 } : { x: 0 }}
        transition={{ type: "tween", duration: 0.2 }}
        className={classes.root}
      >
        <div className={classes.logo}>
          <h1 className="text-2xl font-medium">DASHBOARD</h1>
        </div>

        <nav className={classes.navigation}>
          {routes.map((link) => (
            <div key={link.label} onClick={closeNavHandler}>
              <NavLink href={link.href}>
                <link.Icon /> {link.label}
              </NavLink>
            </div>
          ))}

          <div className={classes.logout} onClick={() => signOut()}>
            <SignoutSVG />
            <p>Signout</p>
          </div>
        </nav>
      </motion.div>
      <Topnav />
      <div className={classes.children}>{children}</div>
    </>
  );
};

export default Sidebar;
