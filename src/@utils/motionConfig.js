const pageVariants = {
  // Page transition variants
  // Initial state, animate in, and exit states

  //The initial state of the page
  initial: {
    opacity: 0,
    y: 50,
  },

  //The state when the page is animating in
  in: {
    opacity: 1,
    y: 0,
  },

  //The state when the page is animating out
  out: {
    opacity: 0,
    y: -50,
  },
};

// Page transition configuration
// Defines how the page transitions will behave
const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.8,
};

export { pageVariants, pageTransition };
