import Banner from "@/components/user/banner/Banner";
import CategoriesSection from "@/components/user/categories/CategoriesSection";
import Hero from "@/components/user/hero section/Hero";
import ImageGrid from "@/components/user/ImageSection/ImageGrid";
import ImageSection from "@/components/user/ImageSection/ImageSection";
import ProductGrid from "@/components/user/product/ProductGrid";

import { getHome } from "@/components/user/utils";
import Image from "next/image";
import Comments from "./comments/Comments";
import ImageAnimation from "@/components/user/ImageSection/ImageAnimation";
import ImageAnimation2 from "@/components/user/ImageSection/ImageAnimation2";

export default async function Home() {
  const { products, store, featuredProducts, collections } = await getHome();
  console.log(collections);

  return (
    <div className="relative  bg-white">
      {/* <HangingSocials /> */}
      <Banner />
      <Hero hero={store.hero[0]} />
      <ProductGrid
        products={collections[0].products}
        header={collections[0].title}
        href={"collections/new-arrivals"}
      />

      <CategoriesSection categories={collections} />
      <ProductGrid
        products={collections[1].products}
        header={collections[1].title}
        href={"collections/new-arrivals"}
      />

      <ImageSection />
      <ProductGrid
        products={collections[2].products}
        header={collections[2].title}
        href={"collections/new-arrivals"}
      />
      <ImageGrid />
      {/* <ProductGrid
        products={featuredProducts}
        header={"FEATURED"}
        href={"/collections/featured"}
      /> */}
      <Comments />

      {/* <ImageAnimation /> */}
      <ImageAnimation2 />
    </div>
  );
}
