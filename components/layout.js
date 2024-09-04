import BottomNavBar from "./BottomNavBar";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const router = useRouter();

  const [isLandscape, setIsLandScape] = useState(false);

  useEffect(() => {
    screen.orientation.addEventListener("change", (e) => {
      setIsLandScape((prev) => {
        const isLandscapeNew =
          e.target.type === "landscape-primary" ||
          e.target.type === "landscape-secondary";

        if (prev !== isLandscapeNew) {
          window.location.reload();
          return isLandscapeNew;
        }
        return prev;
      });
    });
  }, []);

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

      <BottomNavBar bottom={10} />
    </>
  );
}
