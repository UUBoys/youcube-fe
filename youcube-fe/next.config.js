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
  images: {
    domains: [
      "katalog.svkul.cz",
      "obalkyknih.cz",
      "nazornavyuka.cz",
      "ftp.nazornavyuka.cz",
      "uuapp.plus4u.net",
      "s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
