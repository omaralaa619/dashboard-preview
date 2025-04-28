"use client";
import { useRouter } from "next/navigation";
const Btn = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push("/dashboard");
      }}
      className="btn"
    >
      DASHBOARD
    </button>
  );
};

export default Btn;
