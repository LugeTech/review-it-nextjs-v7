/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { hostname: "i5.walmartimages.com", protocol: 'https' },
      { hostname: "newsroom.gy", protocol: 'https' },
      { hostname: "img.clerk.com", protocol: 'https' },
      { hostname: "res.cloudinary.com", protocol: 'https' },
      { hostname: "cloudflare-ipfs.com", protocol: 'https' },
      { hostname: "loremflickr.com", protocol: 'https' },
      { hostname: "placehold.co", protocol: 'https' },
      { hostname: "images.clerk.dev", protocol: 'https' }
    ],
  },
  // experimental: {
  //   serverActions: true,
  // },
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
