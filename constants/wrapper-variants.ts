export const wrapperVariants = {
  open: {
    x: 0,
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
  closed: {
    x: '120vw',
    transition: {
      type: 'easeIn',
      bounce: 0,
      duration: 2,
    },
  },
};

export const wrapperBG = {
  open: {
    display: 'flex',
    opacity: [0, 1],
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
  closed: {
    display: 'none',
    opacity: 0,
    transition: {
      type: 'easeIn',
      bounce: 0,
      duration: 2,
    },
  },
};
