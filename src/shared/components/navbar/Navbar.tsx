// file: components/Navbar.tsx

"use client";

import React, { useState } from "react";
import NavbarItem from "./NavbarItems";
import { navListData } from "../../data/navListData";
import { Button } from "../ui/Button";
import { Sling as Hamburger } from "hamburger-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const menuVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-screen h-20 bg-primary-600 fixed z-50">
        <div className="mycontainer h-full grid grid-cols-12 items-center">
          <div className="bg-[#F3EFE8] h-14 w-14 md:w-30 xl:w-52 rounded-2xl col-span-2"></div>

          <ul className="md:flex hidden gap-12 col-span-8 justify-center">
            {navListData.map((item, idx) => (
              <li key={idx}>
                <NavbarItem {...item} />
              </li>
            ))}
          </ul>

          <div className="col-span-2 flex justify-between items-center">
            <Button className="bg-[#F3EFE8] md:flex hidden px-5 text-black font-bold py-3">
              Masuk
            </Button>

            <div className="md:hidden absolute right-6 z-50 ml-auto rounded-xl bg-[#F3EFE8]">
              <Hamburger
                toggled={isMenuOpen}
                toggle={setIsMenuOpen}
                size={28}
                color="#000000"
              />
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-primary-600 text-white flex flex-col items-center justify-center md:hidden"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul className="flex flex-col gap-8 text-center text-xl">
              {navListData.map((item, idx) => (
                <motion.li key={idx} variants={itemVariants}>
                  <NavbarItem {...item} />
                </motion.li>
              ))}
            </ul>
            <motion.div variants={itemVariants}>
              <Button className="bg-[#F3EFE8] px-8 text-black font-bold py-3 mt-12">
                Masuk
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
