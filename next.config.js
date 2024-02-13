/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"]
    },
    async headers() {
        return [
            {
                source: '/login',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, max-age=0, must-revalidate',
                    },
                ],
            },
        ]
    },
}
module.exports = nextConfig