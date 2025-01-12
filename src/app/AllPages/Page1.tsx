"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import page1 from "../images/page1.png";
import { useTranslation } from "react-i18next";
import "@/app/i18n/i18n";
import useStore from "@/globalState/store";

const fadeInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export const Page1 = ({ isVisible }: { isVisible: boolean }) => {
  const { t, i18n } = useTranslation("page1");
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
      <div className="absolute max-md:hidden inset-0 z-0">
        <Image src={page1} alt="page1" layout="fill" objectFit="cover" />
      </div>

      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key="page1"
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative lg:mx-32 transition-all max-md:mx-9 max-sm:mx-3 my-auto z-10 w-full"
          >
            <motion.div
              variants={fadeInVariants}
              transition={{ duration: 0.8 }}
              className="mt-40 max-md:mt-0 ml-5 max-sm:mr-20"
            >
              <h1 className="text-[95.5px] max-md:text-[45px] text-navy-900 mb-8 font-bold text-blue-950">
                {t("title")}
              </h1>
              <p className="text-gray-600 max-sm:text-[15px] text-[20.5px] lg:max-w-md md:max-w-md sm:max-w-sm mb-8">
                {t("description")}
              </p>
              <p className="text-gray-600 max-sm:text-[15px] text-[20.5px]">
                {t("slogan")}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
