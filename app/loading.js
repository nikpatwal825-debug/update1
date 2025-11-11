"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-heritage-cream via-ivory to-heritage-cream">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='30' y='35' text-anchor='middle' font-size='24' fill='%238B4513'%3Eॐ%3C/text%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Loading Animation - Just Rotating Yantra */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer Ring - Counter Rotation */}
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear",
          }}
          className="absolute"
        >
          <Image
            src="/icons/bahar-wala.svg"
            alt="Loading"
            width={180}
            height={180}
            className="opacity-80"
            priority
          />
        </motion.div>

        {/* Inner Yantra - Main Rotation */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
          className="relative z-10"
        >
          <Image
            src="/icons/andar-wala.svg"
            alt="Loading"
            width={140}
            height={140}
            className="opacity-90"
            priority
          />
        </motion.div>

        {/* Pulsing Glow Effect */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
          }}
          className="absolute w-48 h-48 bg-sandalwood/30 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}

