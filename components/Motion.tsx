"use client";
import React from "react";
import { Transition, Variants, motion } from "framer-motion";
interface Props {
  children: React.ReactNode;
  transition: Transition;
  variants: Variants;
  classNames?: string;
}
const Motion: React.FC<Props> = ({ children, transition, variants, classNames, ...restProps }) => {
  return (
    <motion.div
      {...restProps}
      initial="hidden"
      whileInView="visible"
      variants={variants}
      transition={transition}
      className={`w-full ${classNames && classNames}`}>
      {children}
    </motion.div>
  );
};

export default Motion;
