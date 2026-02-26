import React from "react";
import Card from "../UI/Card";
import Skeleton from "../UI/Skeleton";

const CollectionFormLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <Skeleton height={10} width={"30%"} rows={1} />
        <Skeleton height={200} rows={1} />
      </Card>
      <Card>
        <Skeleton height={10} width={"30%"} rows={1} />
        <Skeleton height={300} rows={1} />
      </Card>
      <Card>
        <Skeleton height={10} width={"30%"} rows={1} />
        <Skeleton height={300} rows={1} />
      </Card>
    </div>
  );
};

export default CollectionFormLoading;
