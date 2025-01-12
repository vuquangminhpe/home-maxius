/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import useStore from "@/globalState/store";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const sectionVariants = {
  even: {
    initial: {
      opacity: 0,
      y: 100,
      flex: 1,
      backgroundColor: "#0a1228",
    },
    animate: {
      opacity: 1,
      y: 0,
      flex: 1,
      backgroundColor: "#0a1228",
      transition: {
        y: { duration: 0.8, ease: "easeOut" },
        opacity: { duration: 0.8 },
      },
    },
    hover: {
      flex: 1.3,
      backgroundColor: "#1a2238",
      transition: {
        flex: { duration: 0.3, ease: "easeOut" },
        backgroundColor: { duration: 0.2 },
      },
    },
  },
  odd: {
    initial: {
      opacity: 0,
      y: -100,
      flex: 1,
      backgroundColor: "#0a1228",
    },
    animate: {
      opacity: 1,
      y: 0,
      flex: 1,
      backgroundColor: "#0a1228",
      transition: {
        y: { duration: 0.8, ease: "easeOut" },
        opacity: { duration: 0.8 },
      },
    },
    hover: {
      flex: 1.3,
      backgroundColor: "#1a2238",
      transition: {
        flex: { duration: 0.3, ease: "easeOut" },
        backgroundColor: { duration: 0.2 },
      },
    },
  },
};

export const Page3 = ({ isVisible }: { isVisible: boolean }) => {
  const { t, i18n } = useTranslation("page3");
  const { i18nextLng } = useStore();

  useEffect(() => {
    if (i18n.language !== i18nextLng) {
      i18n.changeLanguage(i18nextLng);
    }
  }, [i18nextLng, i18n]);

  if (!i18n.isInitialized) {
    return <div>Loading...</div>;
  }

  const sections = [
    {
      key: "product",
      title: t("sections.product.title"),
      content: t("sections.product.content", { returnObjects: true }) as any[],
    },
    {
      key: "technology",
      title: t("sections.technology.title"),
      content: t("sections.technology.content", {
        returnObjects: true,
      }) as any[],
    },
    {
      key: "application",
      title: t("sections.application.title"),
      content: t("sections.application.content", {
        returnObjects: true,
      }) as any[],
    },
    {
      key: "blockchain",
      title: t("sections.blockchain.title"),
      content: [] as any[],
    },
  ];

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="page3"
          className="min-h-screen  h-full bg-[#0a1228] w-full text-white relative overflow-hidden"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex  flex-col md:flex-row mx-4 md:mx-36 h-full relative"
          >
            {sections.map((section, index) => (
              <motion.div
                key={`section-${index}`}
                variants={
                  index % 2 === 0 ? sectionVariants.even : sectionVariants.odd
                }
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="relative  min-h-[200px] md:min-h-[300px] w-full md:w-auto"
              >
                <div className="relative z-10 p-8 h-full">
                  {index < sections.length - 1 && (
                    <div className="hidden  md:block absolute right-0 top-8 bottom-8">
                      <motion.div
                        initial={{ scaleY: 1, backgroundColor: "#374151" }}
                        whileHover={{ scaleY: 0.9, backgroundColor: "#6B7280" }}
                        transition={{ duration: 0.3 }}
                        className="w-[1px]  h-full origin-top"
                      />
                    </div>
                  )}

                  <h3
                    className={`md:text-[20px] text-start lg:text-[30px] font-bold mb-8 mt-[270px] max-sm:mt-[90px] mx-auto transition-colors duration-300
                      ${section.key === "blockchain" ? "text-orange-500" : ""}`}
                  >
                    {section.title}
                  </h3>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {section.content?.map((item: any, i: number) => (
                      <p
                        key={i}
                        className="text-sm leading-relaxed tracking-wide max-sm:text-xs max-md:text-sm"
                      >
                        {item.plain ? (
                          <span className="text-gray-400">{item.text}</span>
                        ) : (
                          <>
                            {item.text && (
                              <span
                                className={
                                  item.highlight
                                    ? "text-orange-500"
                                    : "text-gray-400"
                                }
                              >
                                {item.text}
                              </span>
                            )}
                            {item.suffix && (
                              <span className="text-gray-400">
                                {item.suffix}
                              </span>
                            )}
                            {item.linkedText && (
                              <span className="text-orange-500">
                                {item.linkedText}
                              </span>
                            )}
                            {item.suffix2 && (
                              <span className="text-gray-400">
                                {item.suffix2}
                              </span>
                            )}
                            {item.linkedText2 && (
                              <span className="text-orange-500">
                                {item.linkedText2}
                              </span>
                            )}
                          </>
                        )}
                      </p>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Page3;
