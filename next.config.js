/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
      serverComponentsExternalPackages: ["mongoose"],
  },
  webpack: (config) => {
      config.experiments = {
          topLevelAwait: true,
          layers: true,
      };
      return config;
  },
}

module.exports = nextConfig

//https://github.com/Automattic/mongoose/issues/13252
