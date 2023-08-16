/** @type {import('next').NextConfig} */
const { version } = require('./package.json');

const nextConfig = {
  output: 'standalone',
  publicRuntimeConfig: { version },
  reactStrictMode: true,
}

module.exports = nextConfig
