/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["i5.walmartimages.com", "newsroom.gy", "img.clerk.com", "res.cloudinary.com", "cloudflare-ipfs.com", "loremflickr.com", "placehold.co", "images.clerk.dev"],
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
};

module.exports = nextConfig;
// export default nextConfig;
