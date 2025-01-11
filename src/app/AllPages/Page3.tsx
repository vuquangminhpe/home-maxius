import { AnimatePresence, motion } from "framer-motion";
import { ContentItem } from "../types/page3.type";

interface Section {
  title: string;
  content: ContentItem[];
}

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
  const sections: Section[] = [
    {
      title: "Product",
      content: [
        {
          text: "High-Performance Server",
          highlight: true,
          suffix: " with an extensive selection of serviceable capabilities",
        },
        {
          text: "Building IDC",
          highlight: true,
          suffix: ", incorporating the latest",
          linkedText: " Storage",
          highlight2: true,
          suffix2: " technology applicable to various I/O devices",
        },
        {
          text: "Various",
          linkedText: " Blockchain Solutions",
          highlight: true,
          suffix: ", including IPFS.",
        },
        {
          text: "",
          plain: true,
        },
      ],
    },
    {
      title: "Technology",
      content: [
        {
          text: "Based on more than 20 years of research know-how and technology, we are the only company in Korea that makes HPC servers",
          linkedText: " using self-developed system",
          highlight: true,
          suffix: " semiconductors and",
          linkedText2: " provides solutions specialized",
          highlight2: true,
          suffix2: " in the intelligent data center in the IT industry.",
        },
      ],
    },
    {
      title: "Application",
      content: [
        {
          text: "With our services, Maxius strives to supply differentiated products and solutions.",
          plain: true,
        },
      ],
    },
    {
      title: "Blockchain",
      content: [],
    },
  ];

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="page3"
          className="min-h-screen h-full bg-[#0a1228] w-full text-white relative overflow-hidden"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row mx-4 md:mx-36 h-full relative"
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
                className="relative min-h-[200px] md:min-h-[300px] w-full md:w-auto"
              >
                <div className="relative z-10 p-8 h-full">
                  {index < sections.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-8 bottom-8">
                      <motion.div
                        initial={{ scaleY: 1, backgroundColor: "#374151" }}
                        whileHover={{ scaleY: 0.9, backgroundColor: "#6B7280" }}
                        transition={{ duration: 0.3 }}
                        className="w-[1px] h-full origin-top"
                      />
                    </div>
                  )}

                  <h3
                    className={`md:text-[20px] text-start lg:text-[30px] font-bold mb-8 mt-[120px] max-sm:mt-[40px] mx-auto transition-colors duration-300
                                ${index === 3 ? "text-orange-500" : ""}`}
                  >
                    {section.title}
                  </h3>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {section.content.map((item, i) => (
                      <p
                        key={i}
                        className={`text-sm leading-relaxed tracking-wide max-sm:text-xs max-md:text-sm`}
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
