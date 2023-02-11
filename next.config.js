module.exports = {
  async rewrites() {
      return [
        {
          source: '/:path*',
          destination: 'https://api-card-limit-expose-rodolfobelo19.vercel.app/:path*',
        },
      ]
    },
};