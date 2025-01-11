/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const fadeInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const customScrollbar = `
  .custom-scrollbar::-webkit-scrollbar {
    width:1px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 1px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 1px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const Page4 = ({ isVisible }: { isVisible: boolean }) => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const storyData = {
    History: [
      {
        year: "2021",
        events: [
          "Rebrand the Company name to Maxius",
          "1st Pan Governmental Information Resource Integration HW3",
        ],
      },
      {
        year: "2020",
        events: [
          "2nd construction of AI-based adaptive security system",
          "SPC Certification : TOP 5 Rank record in the world of storage",
        ],
      },
      { year: "2019", events: ["Development of Genome Analysis System"] },
    ],
    Partners: [
      "Cheongwadee",
      "KHNP",
      "Ministry of National Defense",
      "Gunpo city",
      "Korea Agro-Fisheries&Food Trade Corporation",
      "JeciliaNamdo",
      "KMf8",
      "JDG",
      "Korea Housing Finance Corporation",
      "Gyeonggi Provincial Police Agency",
      "NCIS",
      "KPIC",
      "Supreme Court of Korea",
      "IPET",
      "LH",
      "National Guguk Center",
      "Korea Workers Compensation&Welfare Service",
    ],
    Patents: [
      "High-speed data I/O semiconductor Chip",
      "Intelligent Pattern Analysis Algorithm",
      "OS and SSD optimization",
    ],
    Awards: [
      "Awarded the Sejong Award at the KR Patent Awards",
      "Certified by Korea Excellent Product Designation",
      "Korean Green Technology",
    ],
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="page4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="min-h-screen mt-56 max-lg:mx-48 mx-32 max-md:mx-24 max-sm:mx-1 bg-white p-4 md:p-8 relative"
        >
          <style>{customScrollbar}</style>
          <motion.h1
            variants={fadeInVariants}
            className="text-4xl mb-8 text-center font-bold"
          >
            STORY
          </motion.h1>

          <div className="hidden   lg:grid grid-cols-4 gap-6 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
            {Object.entries(storyData).map(([category, items], index) => (
              <motion.div
                key={category}
                variants={fadeInVariants}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="p-6 border rounded-lg shadow-md bg-gray-50"
              >
                <h2 className="text-xl mb-4 font-semibold text-gray-800">
                  {category}
                </h2>
                <div className="space-y-3 overflow-y-auto max-h-[300px] custom-scrollbar">
                  {Array.isArray(items)
                    ? items.map((item, i) => (
                        <div key={i} className="text-sm text-gray-700">
                          {typeof item === "string" ? (
                            <p>{item}</p>
                          ) : (
                            <div>
                              <div className="font-medium text-gray-900">
                                {item.year}
                              </div>
                              <ul className="list-disc list-inside pl-4">
                                {item.events.map((event, j) => (
                                  <li key={j}>{event}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))
                    : null}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:hidden max-sm:w-[60%] max-md:w-[80%] mx-auto">
            <Carousel
              setApi={setApi}
              className="w-full relative"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {Object.entries(storyData).map(([category, items], index) => (
                  <CarouselItem
                    key={category}
                    className="pl-2 md:pl-4 basis-full md:basis-1/2"
                  >
                    <div className="h-full p-4 md:p-6">
                      <h2 className="text-xl mb-4 font-semibold text-gray-800">
                        {category}
                      </h2>
                      <div className="space-y-3 overflow-y-auto max-h-[50vh] md:max-h-[300px] custom-scrollbar">
                        {Array.isArray(items)
                          ? items.map((item, i) => (
                              <div key={i} className="text-sm text-gray-700">
                                {typeof item === "string" ? (
                                  <p className="break-words">{item}</p>
                                ) : (
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {item.year}
                                    </div>
                                    <ul className="list-disc list-inside pl-4">
                                      {item.events.map((event, j) => (
                                        <li key={j} className="break-words">
                                          {event}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ))
                          : null}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 hidden">
                <CarouselPrevious />
              </div>
              <div className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 hidden">
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
