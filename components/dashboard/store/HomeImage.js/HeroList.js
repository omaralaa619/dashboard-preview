import { useState } from "react";
import Card from "../../UI/Card";
import Skeleton from "../../UI/Skeleton";
import HeroForm from "./HeroForm";
import HeroItem from "./HeroItem";
import classes from "../categories/CategoriesList.module.css";

const HeroList = ({ loading, hero, refetch }) => {
  const [showForm, setSHowForm] = useState(false);

  return (
    <div className={classes.main}>
      {!loading && (
        <Card className={classes.card}>
          <div className={classes.titleContainer}>
            <h3 className={classes.title}>Hero</h3>
          </div>
          {hero.map((item, index) => (
            <HeroItem key={index} item={item} refetch={refetch} hero={hero} />
          ))}

          {!showForm && (
            <p className={classes.add} onClick={() => setSHowForm(true)}>
              Add Item +
            </p>
          )}

          {showForm && (
            <HeroForm
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

export default HeroList;
