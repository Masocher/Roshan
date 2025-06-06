/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    devIndicators: {
        buildActivity: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s3.ir-thr-at1.arvanstorage.ir",
                port: "",
                pathname: "/roshan-test/**",
            },
        ],
    },
};

export default nextConfig;
