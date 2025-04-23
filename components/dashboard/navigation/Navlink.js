"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import classes from "./Navlink.module.css";

const NavLink = ({ children, href }) => {
  let segment = useSelectedLayoutSegment();
  //   let active = href == `/${segment}`;
  const active = () => {
    if (href == `/dashboard/${segment}`) {
      return true;
    }
    if (href == "/dashboard" && segment == null) {
      return true;
    }
  };

  return (
    <Link href={href}>
      <p className={`${active() ? classes.activeLink : ""} ${classes.link}`}>
        {children}
      </p>
    </Link>
  );
};

export default NavLink;
