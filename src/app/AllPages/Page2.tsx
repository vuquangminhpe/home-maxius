"use client";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import images2 from "../images/page2.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import "@/app/i18n/i18n";
import useStore from "@/globalState/store";

const fadeInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export const Page2 = ({ isVisible }: { isVisible: boolean }) => {
  const { t, i18n } = useTranslation("page2");
  const { i18nextLng } = useStore();

  useEffect(() => {
    if (i18n.language !== i18nextLng) {
      i18n.changeLanguage(i18nextLng);
    }
  }, [i18nextLng, i18n]);

  const items = t("items", { returnObjects: true }) as string[];

  if (!i18n.isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full flex bg-white relative overflow-hidden">
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
              {items.map((text, index) => (
                <motion.div
                  key={`text-${index}`}
                  variants={fadeInVariants}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="mb-6 text-start text-[50px] max-lg:text-[30px] max-md:text-[20px]"
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
};
