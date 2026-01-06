import { motion } from "motion/react";
import { pageVariants, pageTransition } from "../../@utils";

/**
 * MotionWrapper Component
 * -----------------------
 * A higher-order wrapper component that provides page transition animations
 * using Framer Motion (via the `motion` API). This component wraps any page or
 * element and applies smooth entrance, exit, and transition effects.
 *
 * Usage Example:
 * ```tsx
 * <MotionWrapper>
 *   <YourPageComponent />
 * </MotionWrapper>
 * ```
 *
 * @component
 * @param {MotionWrapperProp} props - Component props.
 * @param {ReactNode} props.children - The content to be animated within the motion wrapper.
 *
 * @returns {JSX.Element} The wrapped children component with motion transitions applied.
 *
 * @dependencies
 * - `motion/react` for animation.
 * - `pageVariants` and `pageTransition` from `@utils` for defining animation behavior.
 *
 * @remarks
 * - Useful for consistent page transitions in multi-page layouts.
 * - Requires `pageVariants` and `pageTransition` objects to be properly defined.
 *
 * @example
 * // Example: Using MotionWrapper in a page
 * import MotionWrapper from "../components/common/MotionWrapper";
 *
 * export default function HomePage() {
 *   return (
 *     <MotionWrapper>
 *       <h1>Welcome Home!</h1>
 *     </MotionWrapper>
 *   );
 * }
 */

export default function MotionWrapper({ children }) {
  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </>
  );
}
