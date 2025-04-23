"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
const PHprovoider = ({ children }) => {
  if (typeof window !== "undefined") {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    });
  }
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export default PHprovoider;
