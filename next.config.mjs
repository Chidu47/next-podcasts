/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lovely-flamingo-139.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "majestic-wildebeest-210.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
    ],
  },
};

export default nextConfig;
