import { AnimatePresence, motion } from "framer-motion";
import images5 from "../images/page3.png";
import Image from "next/image";
const fadeInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};
export const Page5 = ({ isVisible }: { isVisible: boolean }) => (
  <div className="h-screen w-full flex bg-white relative overflow-hidden">
    <Image
      className="max-md:object-left h-full"
      src={images5}
      alt="Background"
      fill
      priority
      style={{ objectFit: "cover" }}
    />
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="page5"
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="min-h-screen flex items-center justify-center text-white p-8 relative"
        >
          <motion.div
            variants={fadeInVariants}
            transition={{ duration: 0.8 }}
            className="space-y-8 mt-40"
          >
            <motion.div variants={fadeInVariants} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl mb-2">Company.</h2>
              <p className="text-gray-400">support@maxius.io</p>
            </motion.div>

            <motion.div variants={fadeInVariants} transition={{ delay: 0.4 }}>
              <h2 className="text-2xl mb-2">Warranty.</h2>
              <a href="#" className="text-gray-400">
                Learn more &gt;
              </a>
            </motion.div>

            <motion.div variants={fadeInVariants} transition={{ delay: 0.6 }}>
              <h2 className="text-2xl mb-2">Technical support.</h2>
              <p className="text-gray-400">support@maxius.io</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
