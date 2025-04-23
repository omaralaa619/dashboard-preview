"use client";
import { useEffect, useState } from "react";
import classes from "./CategoriesList.module.css";
import Card from "../../UI/Card";

import Skeleton from "../../UI/Skeleton";
import LoadingSpinner from "../../UI/LoadingSpinner";
import CategoryItem from "./CategoryItem";

import { useUploadThing } from "@/utils/uploadthing";
import CategoriesForm from "./CategoriesForm";

const CategoriesList = ({ categories, loading, refetch }) => {
  const [showForm, setSHowForm] = useState(false);

  console.log(categories);

  return (
    <div className={classes.main}>
      {!loading && (
        <Card className={classes.card}>
          <div className={classes.titleContainer}>
            <h3 className={classes.title}>Categories</h3>
          </div>
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              item={category}
              refetch={refetch}
              categories={categories}
            />
          ))}

          {!showForm && (
            <p className={classes.add} onClick={() => setSHowForm(true)}>
              Add Category +
            </p>
          )}

          {showForm && (
            <CategoriesForm
              refetch={refetch}
              close={() => setSHowForm(false)}
              type={"add"}
            />
          )}
        </Card>
      )}

      {loading && (
        <Card className={classes.card}>
          <Skeleton rows={1} height={15} width={"35%"} />
          <Skeleton rows={3} height={15} />
        </Card>
      )}
    </div>
  );
};

export default CategoriesList;
