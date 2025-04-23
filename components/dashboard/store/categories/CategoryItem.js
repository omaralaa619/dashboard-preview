import DeleteSVG from "@/svgs/DeleteSVG";
import LoadingSpinner from "../../UI/LoadingSpinner";

import classes from "./CategoryItem.module.css";
import { useState } from "react";
import EditSVG from "@/svgs/EditSVG";
import CategoriesForm from "./CategoriesForm";
import { Pencil, Trash2 } from "lucide-react";

const CategoryItem = ({ item, refetch, categories }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteHandler = async () => {
    if (categories.length > 1) {
      setDeleteLoading(true);

      try {
        const response = await fetch("/api/store", {
          method: "DELETE",
          body: JSON.stringify({
            title: item.title,
            defaultImage: item.imageUrl,
            type: "category",
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
            <p>{item.title}</p>

            <img className="h-20 rounded-sm" src={item.imageUrl} alt="" />
          </div>

          <div className="flex gap-4 ">
            <div onClick={() => setIsEdit(true)} className="cursor-pointer">
              <Pencil size={20} strokeWidth={1.25} />
            </div>

            <div
              className={`${
                categories.length > 1 ? "cursor-pointer" : "cursor-default"
              }`}
              onClick={deleteHandler}
            >
              {!deleteLoading && (
                <Trash2
                  size={20}
                  strokeWidth={1.25}
                  color={
                    categories.length > 1
                      ? "var(--black)"
                      : "var(--secondaryText)"
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
        <CategoriesForm
          item={item}
          type={"edit"}
          refetch={refetch}
          close={() => setIsEdit(false)}
        />
      )}
    </div>
  );
};

export default CategoryItem;
