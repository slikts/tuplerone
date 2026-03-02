import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['@takumi-rs/image-response', 'typescript', 'twoslash'],

  reactStrictMode: true,
};

export default withMDX(config);
