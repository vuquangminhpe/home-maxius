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
import { useTranslation } from "react-i18next";
import useStore from "@/globalState/store";

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
  const { t, i18n } = useTranslation("page4");
  const { i18nextLng } = useStore();

  useEffect(() => {
    if (i18n.language !== i18nextLng) {
      i18n.changeLanguage(i18nextLng);
    }
  }, [i18nextLng, i18n]);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!i18n.isInitialized) {
    return <div>Loading...</div>;
  }

  const categories = t("categories", { returnObjects: true });

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="page4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="min-h-screen max-md:mt-[500px] max-lg:mt-[340px] mt-[300px] max-lg:mx-48 mx-32 max-md:mx-24 max-sm:mx-1 bg-white p-4 md:p-8 relative"
        >
          <style>{customScrollbar}</style>
          <motion.h1
            variants={fadeInVariants}
            className="text-[99px] max-lg:text[30px] max-sm:text-[25px] mb-8 text-center font-bold"
          >
            {t("title")}
          </motion.h1>

          <div className="hidden lg:grid grid-cols-4 gap-6 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
            {Object.entries(categories).map(
              ([key, category]: [string, any], index) => (
                <motion.div
                  key={key}
                  variants={fadeInVariants}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="p-6 border rounded-lg shadow-md bg-gray-50"
                >
                  <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 font-semibold text-gray-800">
                    {" "}
                    {category.title}
                  </h2>
                  <div className="space-y-3 overflow-y-auto max-h-[300px] custom-scrollbar">
                    {Array.isArray(category.items) &&
                      category.items.map((item: any, i: number) => (
                        <div key={i} className="text-sm text-gray-700">
                          {typeof item === "string" ? (
                            <p>{item}</p>
                          ) : (
                            <div>
                              <div className="font-medium text-gray-900">
                                {item.year}
                              </div>
                              <ul className="list-disc list-inside pl-4">
                                {item.events.map((event: string, j: number) => (
                                  <li key={j}>{event}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </motion.div>
              )
            )}
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
                {Object.entries(categories).map(
                  ([key, category]: [string, any], index) => (
                    <CarouselItem
                      key={key}
                      className="pl-2 md:pl-4 basis-full md:basis-1/2"
                    >
                      <div className="h-full p-4 md:p-6">
                        <h2 className="text-xl mb-4 font-semibold text-gray-800">
                          {category.title}
                        </h2>
                        <div className="space-y-3 overflow-y-auto max-h-[50vh] md:max-h-[300px] custom-scrollbar">
                          {Array.isArray(category.items) &&
                            category.items.map((item: any, i: number) => (
                              <div key={i} className="text-sm text-gray-700">
                                {typeof item === "string" ? (
                                  <p className="break-words">{item}</p>
                                ) : (
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {item.year}
                                    </div>
                                    <ul className="list-disc list-inside pl-4">
                                      {item.events.map(
                                        (event: string, j: number) => (
                                          <li key={j} className="break-words">
                                            {event}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </CarouselItem>
                  )
                )}
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

export default Page4;
