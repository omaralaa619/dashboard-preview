import React, { useEffect, useState } from "react";
import HeroList from "./HomeImage.js/HeroList";
import CategoriesList from "./categories/CategoriesList";
import Timer from "./timer/Timer";
import Banner from "./banner/Banner";

const StoreMain = () => {
  const [storeData, setStoreData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchStoreData = async () => {
    setLoading(true);
    const response = await fetch("/api/store", {
      method: "GET",
    });

    const data = await response.json();
    setStoreData(data);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStoreData();
  }, []);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        storeData.categories && (
          <div className="w-full">
            <div>
              <Banner banner={storeData.banner} refetch={fetchStoreData} />
            </div>
            <div className="w-full ">
              <HeroList hero={storeData.hero} refetch={fetchStoreData} />
            </div>

            <div>
              <CategoriesList
                categories={storeData.categories}
                refetch={fetchStoreData}
              />
            </div>

            {/* <div>
              <Timer data={storeData} />
            </div> */}
          </div>
        )
      )}
    </>
  );
};

export default StoreMain;
