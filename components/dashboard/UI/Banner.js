import { AnimatePresence, motion } from "framer-motion";
import classes from "./Banner.module.css";
import { useEffect, useState } from "react";
import CloseX from "@/svgs/CloseX";
import { useDispatch, useSelector } from "react-redux";
import { adminUiActions } from "@/store/admin-ui-store";
import { toggleBanner } from "@/lib/banner";
import { CircleCheckBig, CircleX, X } from "lucide-react";

const Banner = ({ message }) => {
  const show = useSelector((state) => state.adminUi.banner.open);
  const content = useSelector((state) => state.adminUi.banner.content);
  const status = useSelector((state) => state.adminUi.banner.status);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "tween", damping: 10, stiffness: 100 }}
            className={classes.container}
          >
            <div className="flex items-center justify-center gap-4">
              <p>{content}</p>
              {status == "error" ? (
                <CircleX strokeWidth={1.5} />
              ) : (
                <CircleCheckBig strokeWidth={1.5} size={24} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Banner;
