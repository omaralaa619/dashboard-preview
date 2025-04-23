"use client";

import { useEffect, useRef, useState } from "react";

import ComboBoxArrowsSVG from "@/svgs/ComboBoxArrowsSVG";
import classes from "./ComboBox.module.css";

const ComboBox = ({ title, dropdownItems, titleSVG, gap, className }) => {
  const [open, setOpen] = useState(false);
  const optionsRef = useRef(null);

  const toggleHandler = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      onClick={toggleHandler}
      ref={optionsRef}
      className={`${classes.boxContainer} ${className}`}
    >
      <div className={classes.box} style={{ gap: gap }}>
        <div className={classes.boxLeft}>
          {titleSVG}
          <p>{title}</p>
        </div>
        <div>
          <ComboBoxArrowsSVG />
        </div>
      </div>
      <div className={`${open ? "" : classes.none} ${classes.dropDown}`}>
        {dropdownItems.map((item) => (
          <div key={item.title} onClick={item.action}>
            <p className={classes.item}>
              {item.svg} {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComboBox;
