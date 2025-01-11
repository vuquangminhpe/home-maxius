import { AnimatePresence, motion } from "framer-motion";
import images2 from "../images/page2.png";
import Image from "next/image";
const fadeInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export const Page2 = ({ isVisible }: { isVisible: boolean }) => (
  <div className="h-screen w-full  flex bg-white relative overflow-hidden">
    <Image
      src={images2}
      alt="Background"
      fill
      priority
      style={{ objectFit: "cover", objectPosition: "center" }}
    />
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="page2"
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="min-h-screen mx-40 max-md:mx-20 max-sm:mx-4 flex items-center justify-center text-white p-8 relative"
        >
          <div className="mt-40 max-sm:mt-14 max-sm:mr-6">
            {[
              "Self-produced semiconductors",
              "Production and Sales of High-Performance Servers with self-manufactured semiconductors",
              "Construction of operative Blockchain IDC",
              "Establish solution relating to Blockchain (IPFS)",
            ].map((text, index) => (
              <motion.div
                key={`text-${index}`}
                variants={fadeInVariants}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="mb-6 text-start text-[50px]  max-lg:text-[30px] max-md:text-[20px] "
              >
                {index + 1}. {text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
