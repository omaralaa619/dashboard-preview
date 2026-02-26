import React, { useEffect, useState } from "react";
import HeroList from "./HomeImage.js/HeroList";
import CategoriesList from "./categories/CategoriesList";
import Timer from "./timer/Timer";
import Banner from "./banner/Banner";
import ImageGallery from "./imageGallery/ImageGallery";
import Comments from "./comments/Comments";
import ImageSection from "./imageSection/ImageSection";
import ImageAnimation from "./imageAnimation/ImageAnimation";
import LoadingStore from "./LoadingStore";

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
        <LoadingStore />
      ) : (
        <div className="w-full flex flex-col mt-9 gap-9 ">
          <div>
            <Banner banner={storeData.banner} setStoreData={setStoreData} />
          </div>
          <div className="w-full ">
            <HeroList hero={storeData.hero} setStoreData={setStoreData} />
          </div>

          {/* <div>
              <CategoriesList
                categories={storeData.categories}
                refetch={fetchStoreData}
              />
            </div> */}

          <div>
            <ImageGallery
              images={storeData.imageGallery}
              setStoreData={setStoreData}
            />
          </div>
          <div>
            <Comments
              comments={storeData.comments}
              setStoreData={setStoreData}
            />
          </div>
          <div>
            <ImageSection
              image={storeData.imageSection}
              setStoreData={setStoreData}
            />
          </div>
          <div>
            <ImageAnimation
              image={storeData.imageAnimation}
              setStoreData={setStoreData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StoreMain;
