/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cloudflare-ipfs.com',
            port: '',
          },
        ],
      },
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
//cloudflare-ipfs.com

module.exports = nextConfig

//https://github.com/Automattic/mongoose/issues/13252
