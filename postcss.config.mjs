// /** @type {import('postcss-load-config').Config} */
// const config = {
//   plugins: {
//     '@tailwindcss/postcss': {},
//   },
// }

// export default config

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this 'env' block to expose your variables
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;