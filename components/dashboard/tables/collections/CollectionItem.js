import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import classes from "./CollectionList.module.css";
import Image from "next/image";
import Checkbox from "../../UI/Checkbox";
import Link from "next/link";
import { Grip } from "lucide-react";

const CollectionItem = ({
  collection,
  reorderHandler,
  handleCheckboxes,
  checkedCollections,
}) => {
  const dragControls = useDragControls();
  const y = useMotionValue(0);
  return (
    <Reorder.Item
      id={collection._id}
      value={collection}
      className={classes.row}
      dragListener={false}
      dragControls={dragControls}
      onDragEnd={reorderHandler}
    >
      <div className={classes.checkable}>
        <label className={` ${classes.checkable} ${classes.container}`}>
          <Image
            width={70}
            height={100}
            className={classes.image}
            src={collection.image}
            alt=""
          />

          <p className={`${classes.mobNone} ${classes.title} select-none`}>
            {collection.title}
          </p>

          <Checkbox
            value={collection._id}
            onChange={handleCheckboxes}
            checked={checkedCollections.includes(collection._id)}
          />
        </label>
      </div>

      <Link
        href={`/dashboard/collections/${collection._id}`}
        className={classes.desktopRow}
      >
        <div className={`${classes.statusAmount} ${classes.mobNone}`}>
          <p className="select-none">{collection.products.length} product(s)</p>
        </div>
      </Link>

      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="cursor-grab hidden lg:block mr-4 touch-none"
      >
        <Grip />
      </div>

      <div className={classes.rightMobContainer}>
        <Link
          href={`/dashboard/collections/${collection._id}`}
          className={classes.rightMob}
        >
          <p className={classes.title}>{collection.title}</p>

          <p className={classes.sectext}>
            {collection.products.length} product(s)
          </p>
        </Link>
      </div>
      <div
        className="cursor-pointer mr-4 lg:hidden w-11 touch-none"
        onPointerDownCapture={(e) => dragControls.start(e)}
      >
        <Grip />
      </div>
    </Reorder.Item>
  );
};

export default CollectionItem;
