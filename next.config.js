/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", "cms.muayiktea.com", "cdn.shopify.com"],
  },
  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "en",
    localeDetection: false,
  },
};

module.exports = nextConfig;
