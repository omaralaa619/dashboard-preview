const nextConfig = {
  images: {
    domains: ["utfs.io", "44w7558ap8.ufs.sh"],
  },
  env: {
    POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://api.bosta.co",
  //     },
  //   ];
  // },
};

export default nextConfig;
