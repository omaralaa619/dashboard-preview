import Link from "next/link";
import DesktopShop from "./DesktopShop";
import { useSession } from "next-auth/react";

const DesktopNavlinks = () => {
  const { data: session } = useSession();

  return (
    <div className="hidden md:flex gap-6 !text-white font-normal">
      <Link href={"/"}>
        <p>HOME</p>
      </Link>
      <DesktopShop />
      <Link href={"/"}>
        <p>CONTACT</p>
      </Link>

      <Link href={"/dashboard"}>
        <p className={`${!session ? "hidden" : ""}`}>DASHBOARD</p>
      </Link>
    </div>
  );
};

export default DesktopNavlinks;
