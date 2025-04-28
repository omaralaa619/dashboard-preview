"use client";

import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-full w-full bg-neutral-950">
      <button
        onClick={() => {
          router.push("/dashboard");
        }}
        className="btn"
      >
        DASHBOARD
      </button>
    </div>
  );
};

export default page;
