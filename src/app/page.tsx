"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./NavBar/navbar";
import { Page1 } from "./AllPages/Page1";
import { Page2 } from "./AllPages/Page2";
import { Page3 } from "./AllPages/Page3";
import { Page4 } from "./AllPages/Page4";
import { Page5 } from "./AllPages/Page5";

interface PageData {
  id: string;
  component: React.ReactNode;
  hash: string;
}

const ScrollPages = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const pages: PageData[] = [
    {
      id: "product",
      component: <Page1 isVisible={currentPage === 0} />,
      hash: "firstPage",
    },
    {
      id: "technology",
      component: <Page2 isVisible={currentPage === 1} />,
      hash: "secondPage",
    },
    {
      id: "application",
      component: <Page3 isVisible={currentPage === 2} />,
      hash: "thirdPage",
    },
    {
      id: "blockchain",
      component: <Page4 isVisible={currentPage === 3} />,
      hash: "fourthPage",
    },
    {
      id: "end",
      component: <Page5 isVisible={currentPage === 4} />,
      hash: "fifthPage",
    },
  ];

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const pageIndex = pages.findIndex((page) => page.hash === hash);
      if (pageIndex !== -1) {
        pagesRef.current[pageIndex]?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    if (!window.location.hash) {
      window.location.hash = pages[0].hash;
    } else {
      handleHashChange();
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const observers = pages.map((_, index) => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrentPage(index);
              const newHash = `#${pages[index].hash}`;
              if (window.location.hash !== newHash) {
                window.history.replaceState(null, "", newHash);
              }
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: "0px",
        }
      );
    });

    pagesRef.current.forEach((ref, index) => {
      if (ref) {
        observers[index].observe(ref);
      }
    });

    return () => {
      observers.forEach((observer, index) => {
        if (pagesRef.current[index]) {
          observer.disconnect();
        }
      });
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="h-full overflow-y-auto snap-y snap-mandatory">
            {pages.map((page, index) => (
              <div
                key={page.id}
                ref={(el) => {
                  pagesRef.current[index] = el;
                }}
                className="h-screen w-full snap-start flex items-center justify-center"
                style={{
                  backgroundColor: index === currentPage ? "" : "",
                  transition: "background-color 0.3s ease",
                }}
              >
                {page.component}
              </div>
            ))}
          </div>

          <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[80] flex flex-col gap-2">
            {pages.map((_, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => {
                  window.location.hash = pages[index].hash;
                }}
              >
                {index === currentPage ? (
                  <div className="w-8 h-2 right-0 bg-orange-500" />
                ) : (
                  <div
                    className={` w-4 h-2 border ${
                      [1, 2, 4].includes(currentPage) ? "bg-white" : "bg-black"
                    } group-hover:border-orange-500 transition-all`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Navbar page={currentPage} />
    </>
  );
};

export default ScrollPages;
