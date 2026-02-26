"use client";

import Button from "@/components/user/ui/Button";
import nextAuth from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="min-h-[100vh] pt-16 flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl">Welcome, {session.user.name}</h1>

        <Button
          onclick={() => signOut()}
          className={
            "bg-buttonSec rounded-sm border border-buttonSec text-white hover:bg-white hover:text-buttonSec transition-colors duration-300 mb-5"
          }
          text={"Sign Out"}
        ></Button>
      </div>
    );
  } else {
    return (
      <div className="min-h-[100vh] pt-16 flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl">you are not signed in</h1>
        <Button
          onclick={() => signIn()}
          className={
            "bg-buttonSec rounded-sm border border-buttonSec text-white hover:bg-white hover:text-buttonSec transition-colors duration-300 mb-5"
          }
          text={"Signin"}
        ></Button>
      </div>
    );
  }
  return (
    <div className="min-h-[100vh] pt-16 flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl">you are not signed in</h1>
      <Button
        onclick={() => signIn()}
        className={
          "bg-buttonSec rounded-sm border border-buttonSec text-white hover:bg-white hover:text-buttonSec transition-colors duration-300 mb-5"
        }
        text={"Signin"}
      ></Button>
    </div>
  );
};

export default Login;
