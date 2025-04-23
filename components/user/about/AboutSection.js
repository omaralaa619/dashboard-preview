import Image from "next/image";
import Button from "../UI/Button";

const AboutSection = () => {
  return (
    <div className="px-6 py-10 mb-10 bg-sec">
      <p className="text-center text-3xl mb-4">
        About <span className="font-bold">LYNNE</span>
      </p>

      <div className="md:flex items-center">
        <div className="relative flex justify-center mb-6 min-h-[250px] flex-1 max-w-[500px]">
          <Image
            src={"/abt1.jpg"}
            width={150}
            height={75}
            alt="ll"
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          />
          <Image
            src={"/abt3.jpg"}
            width={100}
            height={50}
            alt="ll"
            className="absolute top-[70%] left-[30%] translate-x-[-50%] translate-y-[-50%] "
          />
          <Image
            src={"/abt2.jpg"}
            width={100}
            height={50}
            alt="ll"
            className="absolute top-[50%] left-[80%] translate-x-[-50%] translate-y-[-50%] md:left-[70%]"
          />
        </div>

        <div className="flex-1">
          <p className="mb-3">
            At lynne nahle, luxury is redefined. The brand&apos;s philosophy
            centers around empowering individuals to express their identities
            through designs that are as bold and unique as they are. Whether
            It&apos;s a tailored evening gown, an exquisitely crafted accessory,
            or an everyday statement piece, lynne nahle creations are made to
            leave a lasting impression. <br /> <br /> With a blend of Lebanese
            heritage, global sophistication, and a forward-thinking approach,
            lynne nahle continues to set new standards in luxury
            fashion—designed for the few who dare to stand out.
          </p>

          <Button
            className={
              "bg-buttonSec rounded-sm border border-buttonSec text-white hover:bg-white hover:text-buttonSec transition-colors duration-300 mb-5"
            }
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
