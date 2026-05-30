/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.ufs.sh",
      },
    ],
  },
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
