import React from "react";
import Kompas from "@/assets/login/kompas.png";
import Bintang from "@/assets/login/bintang.svg";
import Image from "next/image";
import { motion } from "framer-motion";

const Ornament = () => {
  return (
    <div className="w-screen h-screen absolute z-10 pointer-events-none select-none">
      <motion.div
        className="absolute w-full xl:max-w-3xl lg:max-w-lg md:max-w-md max-w-xl opacity-25 -right-40 -top-60 md:-right-50 md:-top-[30rem]"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        <Image src={Kompas} alt="kompas" draggable={false} />
      </motion.div>

      <motion.div
        className="w-full xl:max-w-3xl lg:max-w-lg md:max-w-md max-w-xl absolute md:-left-70 -left-40 -bottom-40 opacity-25 md:-bottom-100"
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
      >
        <Image src={Kompas} alt="kompas" draggable={false} />
      </motion.div>

      <div className="absolute left-40 top-30">
        <Image src={Bintang} alt="bintang" draggable={false} />
      </div>
    </div>
  );
};

export default Ornament;
