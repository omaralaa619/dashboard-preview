import React from "react";
import Skeleton from "../UI/Skeleton";

const OrderLoading = () => {
  return (
    <div className="mx-[-16px] ">
      <Skeleton rows={1} width={250} height={15} />
      <Skeleton rows={1} width={200} height={15} />

      <div className="flex ">
        <Skeleton rows={1} width={80} height={40} />
        <div className="ml-[-16px]">
          <Skeleton rows={1} width={80} height={40} />
        </div>
      </div>

      <div className="md:flex">
        <div className="flex-[2]">
          <Skeleton rows={1} height={600} />
        </div>

        <div className="flex-1">
          <Skeleton rows={1} height={600} />
        </div>
      </div>
    </div>
  );
};

export default OrderLoading;
