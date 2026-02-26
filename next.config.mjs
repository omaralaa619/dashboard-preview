const nextConfig = {
  images: {
    domains: ["utfs.io", "44w7558ap8.ufs.sh", "nodika-nd.com"],
    minimumCacheTTL: 2678400,
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
