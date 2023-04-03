/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
