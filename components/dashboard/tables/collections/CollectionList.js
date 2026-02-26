import Link from "next/link";
import classes from "./CollectionList.module.css";
import Checkbox from "../../UI/Checkbox";
import Image from "next/image";
import Price from "@/components/user/ui/Price";
import { Grip } from "lucide-react";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useDispatch } from "react-redux";
import { toggleBanner } from "@/lib/banner";
import CollectionItem from "./CollectionItem";

const CollectionList = ({
  collections,
  handleCheckboxes,
  checkedCollections,
  allHandler,
  setCollections,
}) => {
  const dispatch = useDispatch();

  const reorderHandler = async () => {
    const reordered = collections.map((col, index) => ({
      _id: col._id,
      order: index,
    }));
    try {
      const res = await fetch("/api/collections", {
        method: "PUT",

        body: JSON.stringify(reordered),
      });
      const response = await res.json();

      toggleBanner(dispatch, "Collections updated successfully ", "red");

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <div className={`${classes.row} ${classes.header}`}>
          <div className={classes.checkable}>
            <label className={classes.container}>
              Collection
              <Checkbox
                value={"all"}
                onChange={allHandler}
                checked={
                  collections.length == checkedCollections.length &&
                  collections.length != 0
                }
              />
            </label>
          </div>

          <Link href={"#"} className={classes.desktopRow}>
            <p>Products</p>
          </Link>
          <div className="cursor-pointer hidden lg:block mr-4">
            <Grip color="none" />
          </div>
        </div>
      </div>
      <Reorder.Group
        axis="y"
        onReorder={setCollections}
        values={collections}
        className="overflow-hidden"
      >
        {collections.map((collection) => (
          <CollectionItem
            key={collection._id}
            collection={collection}
            reorderHandler={reorderHandler}
            handleCheckboxes={handleCheckboxes}
            checkedCollections={checkedCollections}
          />
        ))}
      </Reorder.Group>
    </>
  );
};

export default CollectionList;
