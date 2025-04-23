import AboutSection from "@/components/user/about/AboutSection";
import Categories from "@/components/user/categories/Categories";
import HeroSlider from "@/components/user/hero/HeroSlider";
import ImageSection from "@/components/user/image-section/ImageSection";
import ProductSlider from "@/components/user/product-slider/ProductSlider";
import TextSection from "@/components/user/text-section/TextSection";
import Timer from "@/components/user/timer/Timer";
import { getHome } from "@/components/user/utils";
import Image from "next/image";

export const revalidate = 60;
export async function generateStaticParams() {
  return ["/"];
}

export default async function Home() {
  const targetDate = "2025-12-30T23:59:59";

  const { products, store } = await getHome();

  return (
    <div className="pt-[50px]">
      <HeroSlider slides={store.hero} />
      {/* <Timer targetDate={targetDate} /> */}
      <Categories categories={store.categories.reverse()} />
      <TextSection />
      <ProductSlider title={"Newest Arrivals"} products={products} />
      {/* <ImageSection /> */}
      <AboutSection />
      <ProductSlider
        title={"Best Selling"}
        products={[...products].sort((a, b) => b.sold - a.sold)}
      />
    </div>
  );
}
