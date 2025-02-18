/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    devIndicators: {
        buildActivity: false,
    },
    images: {
        domains: ["s3.ir-thr-at1.arvanstorage.ir"],
    },
};

export default nextConfig;
