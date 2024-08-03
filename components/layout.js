import BottomNavBar from "./BottomNavBar";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            {/* header here */}
            <main>{children}</main>
          </div>
        </motion.div>
      </AnimatePresence>

      <BottomNavBar />
    </>
  );
}
