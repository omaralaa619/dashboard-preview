import { useEffect, useState } from "react";
import Card from "./Card";
import classes from "./Modal.module.css";
import DeleteSVG from "@/svgs/DeleteSVG";
import CloseX from "@/svgs/CloseX";
import ModalGen from "./ModalGen";
import LoadingSpinner from "./LoadingSpinner";

const Modal = ({
  title,
  subtitle,
  closeHandler,
  ctaStyle,
  ctaTitle,
  action,
  loading,
  open,
}) => {
  return (
    <ModalGen
      open={open}
      closeModal={closeHandler}
      className={classes.container}
    >
      <div className={classes.top}>
        <div>
          <DeleteSVG />
        </div>
        <div onClick={closeHandler} className={classes.x}>
          <CloseX />
        </div>
      </div>
      <div className={classes.middle}>
        <p className={classes.title}>{title}</p>
        <p className={classes.subtitle}>{subtitle}</p>
      </div>
      <div className={classes.bottom}>
        <button className={classes.cancel} onClick={closeHandler}>
          Cancel
        </button>
        <button className={ctaStyle} onClick={action} disabled={loading}>
          {loading ? (
            <LoadingSpinner size={16} color={"black"} />
          ) : (
            <p>{ctaTitle}</p>
          )}
        </button>
      </div>
    </ModalGen>
  );
};

export default Modal;
