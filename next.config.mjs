/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'edamam-product-images.s3.amazonaws.com',
              port: '',
              pathname: '/web-img/**',
            },
            {
              protocol: 'https',
              hostname: 'www.edamam.com',
              port: '',
              pathname: '/food-img/**',
            }
          ],
    },
};

export default nextConfig;
