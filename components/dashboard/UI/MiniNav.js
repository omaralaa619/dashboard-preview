import ArrowBackSVG from "@/svgs/ArrowBackSVG";
import classes from "./MiniNav.module.css";
import Link from "next/link";
import ArrowForwardSVG from "@/svgs/ArrowForwardSVG";

const MiniNav = ({ links }) => {
  return (
    <div className={classes.container}>
      {links.map((link) => (
        <div
          key={link.label}
          className={`${link.last ? classes.last : ""} ${classes.inner}`}
        >
          <Link className={`${link.last ? "" : classes.link}`} href={link.href}>
            <p>{link.label}</p>
          </Link>
          <ArrowForwardSVG />
        </div>
      ))}
    </div>
  );
};

export default MiniNav;
