import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import classes from "../categories/CategoryItem.module.css";
import HeroForm from "./HeroForm";

const HeroItem = ({ item, refetch, hero }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteHandler = async () => {
    if (hero.length > 1) {
      setDeleteLoading(true);

      try {
        const response = await fetch("/api/store", {
          method: "DELETE",
          body: JSON.stringify({
            header: item.header,
            subheader: item.subheader,
            defaultImage: item.imageUrl,
            type: "hero",
          }),
        });

        const data = await response.json();

        refetch();
      } catch (error) {
        console.log(error);
      }
      setDeleteLoading(false);
    }
  };
  return (
    <div>
      {!isEdit && (
        <div className={classes.item}>
          <div>
            <p className="text-3xl">{item.header}</p>
            <p>{item.subheader}</p>

            <img className="h-20 rounded-sm" src={item.imageUrl} alt="" />
          </div>

          <div className="flex gap-4 ">
            <div onClick={() => setIsEdit(true)} className="cursor-pointer">
              <Pencil size={20} strokeWidth={1.25} />
            </div>

            <div
              className={`${
                hero.length > 1 ? "cursor-pointer" : "cursor-default"
              }`}
              onClick={deleteHandler}
            >
              {!deleteLoading && (
                <Trash2
                  size={20}
                  strokeWidth={1.25}
                  color={
                    hero.length > 1 ? "var(--black)" : "var(--secondaryText)"
                  }
                />
              )}
              {deleteLoading && (
                <LoadingSpinner size={18} color={"var(--black)"} />
              )}
            </div>
          </div>
        </div>
      )}

      {isEdit && (
        <HeroForm
          item={item}
          type={"edit"}
          refetch={refetch}
          close={() => setIsEdit(false)}
        />
      )}
    </div>
  );
};

export default HeroItem;
