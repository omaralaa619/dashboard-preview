"use client";
import Link from "next/link";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({ children, href, ...props }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTransition = async (e) => {
    // If navigating to same route → do nothing special
    if (pathname === href) {
      return;
    }

    e.preventDefault();

    const template = document.querySelector(".template");
    template?.classList.add("page-transition");

    await sleep(500);
    router.push(href);
  };

  return (
    <Link {...props} href={href} onClick={handleTransition}>
      {children}
    </Link>
  );
};
