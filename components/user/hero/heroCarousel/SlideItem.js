import Image from "next/image";
import Button from "../../UI/Button";
import Link from "next/link";

const SlideItem = ({ slide }) => {
  return (
    <div className="h-full w-full">
      <Image
        fill
        className="object-cover  object-center
         z-0"
        src={slide.imageUrl}
        alt="hero image"
      />
      <div
        className={`absolute text-white text-center  left-[50%] translate-x-[-50%] translate-y-[-50%]  w-[70%]  ${
          slide.header == "" && slide.subheader == "" ? "top-[70%]" : ""
        }
        ${slide.header != "" && slide.subheader == "" ? "top-[60%]" : ""} ${
          slide.header != "" && slide.subheader != "" ? "top-[50%]" : ""
        }
        ${slide.header == "" && slide.subheader != "" ? "top-[60%]" : ""}`}
      >
        <h1 className="text-4xl font-semibold mb-5 tracking-wider">
          {slide.header}
        </h1>
        <p className="mb-5 text-lg tracking-wider">{slide.subheader}</p>

        <Link href={"category/featured"}>
          <Button
            className={
              "bg-none rounded-sm border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 "
            }
          >
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SlideItem;
