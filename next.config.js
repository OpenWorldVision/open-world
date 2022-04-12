module.exports = {
  images: {
    // limit of 25 deviceSizes values
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // limit of 25 imageSizes values
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // limit of 50 domains values
    domains: [],
    // path prefix for Image Optimization API, useful with `loader`
    path: '/_next/image',
    // loader can be 'default', 'imgix', 'cloudinary', 'akamai', or 'custom'
    loader: 'default',
    // disable static imports for image files
    disableStaticImages: false,
    // minimumCacheTTL is in seconds, must be integer 0 or more
    minimumCacheTTL: 60,
    // ordered list of acceptable optimized image formats (mime types)
    formats: ['image/webp'],
    // enable dangerous use of SVG images
    dangerouslyAllowSVG: false,
    // set the Content-Security-Policy header
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  env: {
    environment: 'develop',
    BINANCE_WALLET_PRIVATE_KEY:
      'd8566cb10e61f3e106f5f05a830d4c847ef9f210bff108ce7b28e089fd1a4494',
    BINANCE_WALLET_MNEMONIC:
      'gallery soap miss tell icon tunnel evoke dwarf normal police select exit',
  },
}
