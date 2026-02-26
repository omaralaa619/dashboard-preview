import React from "react";
import Skeleton from "../UI/Skeleton";
import Card from "../UI/Card";

const LoadingStore = () => {
  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <Skeleton rows={1} height={300} width={"100%"} className="!m-0" />
      </Card>

      <Card className="p-5">
        <Skeleton rows={1} height={300} width={"100%"} className="!m-0" />
      </Card>

      <Card className="p-5">
        <Skeleton rows={1} height={300} width={"100%"} className="!m-0" />
      </Card>

      <Card className="p-5">
        <Skeleton rows={1} height={300} width={"100%"} className="!m-0" />
      </Card>
    </div>
  );
};

export default LoadingStore;
