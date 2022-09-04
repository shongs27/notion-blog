/** @type {import('next').NextConfig} */
const StylelintPlugin = require('stylelint-webpack-plugin');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com', 's3.us-west-2.amazonaws.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    config.plugins.push(new StylelintPlugin());

    return config;
  },
};

module.exports = nextConfig;
