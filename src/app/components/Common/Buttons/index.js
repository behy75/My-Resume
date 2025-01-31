import React from 'react';
import { motion } from 'framer-motion';
import { experiencesVariants } from '../FramerMotionVariants';

export default function Button(props) {
  const { title, placeholder, value, setValue } = props;

  if (value == 1) return;

  return (
    <motion.button
      variants={experiencesVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={setValue}
      data-modal-hide="default-modal"
      type="button"
      className={`absolute left-28 bottom-5 w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5`}
    >
      {title}
    </motion.button>
  );
}
