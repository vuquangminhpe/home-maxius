import { AnimatePresence, motion } from "framer-motion";
import images5 from "../images/page3.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import useStore from "@/globalState/store";

const fadeInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export const Page5 = ({ isVisible }: { isVisible: boolean }) => {
  const { t, i18n } = useTranslation("page5");
  const { i18nextLng } = useStore();

  useEffect(() => {
    if (i18n.language !== i18nextLng) {
      i18n.changeLanguage(i18nextLng);
    }
  }, [i18nextLng, i18n]);

  if (!i18n.isInitialized) {
    return <div>Loading...</div>;
  }

  return (
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
                <h2 className="text-[34px] max-md:text-[20px] font-bold mb-2">
                  {t("company.title")}
                </h2>
                <p className="text-gray-400">{t("company.email")}</p>
              </motion.div>

              <motion.div variants={fadeInVariants} transition={{ delay: 0.4 }}>
                <h2 className="text-[34px] max-md:text-[20px] font-bold mb-2">
                  {t("warranty.title")}
                </h2>
                <a
                  href="#"
                  className="text-gray-400 hover:bg-white hover:text-black transition-all cursor-pointer rounded-sm p-3"
                >
                  {t("warranty.link")}
                </a>
              </motion.div>

              <motion.div variants={fadeInVariants} transition={{ delay: 0.6 }}>
                <h2 className="text-[34px] max-md:text-[20px] font-bold mb-2">
                  {t("technicalSupport.title")}
                </h2>
                <p className="text-gray-400 text-[14px] hover:bg-white hover:text-black transition-all cursor-pointer rounded-sm p-3">
                  {t("technicalSupport.email")}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page5;
