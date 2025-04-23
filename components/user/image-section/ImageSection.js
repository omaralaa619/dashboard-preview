import Image from "next/image";
import Button from "../UI/Button";
import Link from "next/link";

const ImageSection = () => {
  return (
    <div className="relative h-[70vh] mb-10">
      <Image
        fill
        className="object-cover object-center"
        src={"/image-section4.jpeg"}
        alt="category image"
      />
      <div className="absolute left-[10%] top-[50%]  translate-y-[-50%]">
        <p className="text-4xl text-white font-normal mb-4">New Prints</p>
        <p className="text-white mb-4">Shop our exclusive Dress Range</p>
        <Link href={"category/featured"}>
          <Button
            className={
              "bg-prim rounded-sm border border-prim text-white hover:bg-white hover:text-prim transition-colors duration-300 mb-5"
            }
          >
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ImageSection;
