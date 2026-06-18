"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface CardImageProps {
  imagePath: string;
  featureName: string;
}

export default function CardImage({ imagePath, featureName }: CardImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/20 rounded-xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] flex items-center justify-center relative overflow-hidden order-1 lg:order-2"
    >
      <Image
        src={imagePath}
        fill
        alt={`Image for ${featureName} feature`}
        className="object-cover absolute rounded-xl"
      />
    </motion.div>
  );
}
