import type { NextConfig } from "next";

console.log('Pinata JWT:', process.env.NEXT_PUBLIC_PINATA_JWT);
console.log('Pinata Gateway:', process.env.NEXT_PUBLIC_PINATA_GATEWAY);

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
