/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://youcube-be.azurewebsites.net/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
