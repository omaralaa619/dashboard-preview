"use client";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { adminUiActions } from "@/store/admin-ui-store";
import LocaleLogo from "@/svgs/LcaleLogo";
import NavLink from "./Navlink";

import HomeSVG from "@/svgs/HomeSVG";

import classes from "./Sidebar.module.css";
import {
  Home,
  ShoppingCart,
  BarChart3,
  Package,
  Percent,
  Store,
  Mail,
  LogOut,
  Layers,
} from "lucide-react";

import Topnav from "./Topnav";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Sidebar = ({ children }) => {
  const brand = process.env.NEXT_PUBLIC_BRAND_NAME;
  const router = useRouter();
  const dispatch = useDispatch();
  const navOpen = useSelector((state) => state.adminUi.navOpen);
  const { data: session, status } = useSession();

  const closeNavHandler = () => {
    dispatch(adminUiActions.closeNav());
  };

  // if (status == "authenticated") {
  //   if (!session.user.admin) {
  //     router.push("/");
  //   }
  // }
  // if (status == "unauthenticated") {
  //   router.push("/");
  // }
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
      Icon: Home,
    },
    {
      href: "/dashboard/orders",
      label: "Orders",
      Icon: ShoppingCart,
    },
    {
      href: "/dashboard/analytics",
      label: "Analytics",
      Icon: BarChart3,
    },
    {
      href: "/dashboard/products",
      label: "Products",
      Icon: Package,
    },
    {
      href: "/dashboard/collections",
      label: "Collections",
      Icon: Layers,
    },
    {
      href: "/dashboard/discounts",
      label: "Discounts",
      Icon: Percent,
    },
    {
      href: "/dashboard/store",
      label: "Store",
      Icon: Store,
    },
    {
      href: "/dashboard/newsletter",
      label: "Newsletter",
      Icon: Mail,
    },
  ];
  return (
    <div>
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
          <LocaleLogo className="w-6 h-6" />
          <h1 className="text-xl tracking-[0.3em] uppercase">Local-e</h1>
        </div>

        <nav className={classes.navigation}>
          <div className="mt-4 mx-4 flex flex-col gap-2">
            {routes.map((link) => (
              <div key={link.label} onClick={closeNavHandler}>
                <NavLink href={link.href}>
                  <link.Icon /> {link.label}
                </NavLink>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-zinc-800 mb-[70px]">
            <div className={classes.logout} onClick={() => signOut()}>
              <LogOut />
              <p>Signout</p>
            </div>
          </div>
        </nav>
      </motion.div>
      <Topnav />
      <div className={classes.children}>{children}</div>
    </div>
  );
};

export default Sidebar;
