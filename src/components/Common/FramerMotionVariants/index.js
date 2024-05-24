export const experiencesVariants = {
  hidden: {
    y: -50,
  },
  visible: {
    y: 0,
    transition: {
      delay: 0,
      duration: 0.8,
      type: 'just',
      stiffness: 120,
    },
  },
  exit: { y: -50 },
};

export const inputsVariants = {
  hidden: {
    x: -50,
  },
  visible: {
    x: 0,
    transition: {
      delay: 0,
      duration: 0.8,
      type: 'just',
      stiffness: 120,
    },
  },
  exit: { x: -50 },
};

export const skillsVariants = {
  visible: { scale: 1, opacity: 1 },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: {
      delay: 0,
      duration: 0.8,
      type: 'spring',
      stiffness: 120,
    },
  },
  hover: {
    scale: 1.3,
    originX: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
    },
  },
};

export const dynamicModalVariants = origin => ({
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 50,
    },
  },
  hidden: {
    opacity: 0,
    scale: 0.5,
    transformOrigin: `${origin.x}px ${origin.y}px`,
  },
});
