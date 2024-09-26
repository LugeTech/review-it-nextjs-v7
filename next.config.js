const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  runtimeCaching: [
    {
      urlPattern: /\/offline/,
      handler: "NetworkOnly",
    },
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineFallback",
        expiration: {
          maxEntries: 200,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});

module.exports = withPWA({
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { hostname: "i5.walmartimages.com", protocol: "https" },
      { hostname: "newsroom.gy", protocol: "https" },
      { hostname: "img.clerk.com", protocol: "https" },
      { hostname: "res.cloudinary.com", protocol: "https" },
      { hostname: "cloudflare-ipfs.com", protocol: "https" },
      { hostname: "loremflickr.com", protocol: "https" },
      { hostname: "placehold.co", protocol: "https" },
      { hostname: "images.clerk.dev", protocol: "https" },
    ],
  },
  // headers: [
  //   {
  //     source: '/fr',
  //     headers: [
  //       {
  //         key: 'Cache-Control',
  //         value: 'no-cache',
  //       },
  //     ],
  //   },
  // ],
});
