import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Bintang from "@/assets/login/bintang.svg";

interface StarProps {
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}

const BintangAcak = () => {
  const [stars, setStars] = useState<StarProps[]>([]);

  const jumlahBintang = 10;

  useEffect(() => {
    const newStars: StarProps[] = [];
    for (let i = 0; i < jumlahBintang; i++) {
      newStars.push({
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 90}%`,
        size: Math.random() * 40 + 40,
        delay: Math.random() * 4,
        duration: Math.random() * 4 + 5,
      });
    }
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 z-10 w-full h-full overflow-hidden pointer-events-none">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0.8, 1, 0], scale: 1 }}
          transition={{
            repeat: Infinity,
            duration: star.duration,
            delay: star.delay,
            ease: "easeInOut",
          }}
        >
          <Image src={Bintang} alt="bintang" layout="fill" />
        </motion.div>
      ))}
    </div>
  );
};

export default BintangAcak;
