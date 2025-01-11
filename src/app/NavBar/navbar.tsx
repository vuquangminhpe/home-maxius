import React, { useState, useEffect } from "react";
import Link from "next/link";
import useStore from "@/globalState/store";

const Navbar = ({ page }: { page: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const lang = useStore((state) => state.i18nextLng);
  const setLang = useStore((state) => state.setI18nextLng);
  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Brochure", href: "/" },
    { title: "Proposal", href: "/" },
    { title: "Contact", href: "/" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  const iLangTransfer = (isNative: boolean) => {
    return (
      <div className="flex items-center gap-4 mx-3">
        <div className="flex gap-2">
          <div
            onClick={() => setLang("kr")}
            className={`
          ${
            lang === "kr"
              ? "text-orange-500"
              : [1, 2, 4].includes(page)
              ? "text-white"
              : "text-black"
          }`}
          >
            KR
          </div>

          <div
            onClick={() => setLang("en")}
            className={`
        ${
          lang === "en"
            ? "text-orange-500"
            : [1, 2, 4].includes(page)
            ? "text-white"
            : "text-black"
        }`}
          >
            EN
          </div>
        </div>

        {isNative && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex space-x-4  flex-col gap-1.5 w-8 group cursor-pointer"
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={`${[1, 2, 4].includes(page) ? "#fff" : "#000"}`}
              className="size-8 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        )}
      </div>
    );
  };
  return (
    <div className="z-[90]">
      <nav className="relative z-[92] p-4 flex justify-between items-center">
        <div
          className={`text-black ${
            [1, 2, 4].includes(page) ? "text-white" : "text-black"
          } text-xl font-bold space-x-4`}
        >
          MAXIUS
        </div>

        {iLangTransfer(true)}
      </nav>

      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/50 z-[91] pointer-events-none ${
            isOpen ? "" : "pointer-events-auto"
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-[#000033]/90 z-[93] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div className="h-full overflow-y-auto">
          <div className="p-4 flex justify-between items-start sticky top-0 bg-[#000033]/90">
            <div className="flex gap-2">{iLangTransfer(false)}</div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-4xl hover:text-orange-500"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <div className="px-4  flex flex-col justify-around h-full">
            <div className="px-4 -translate-y-14 pt-12">
              {menuItems.map((item, index) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`block text-2xl py-3 ${
                    index === 0 ? "text-orange-500" : "text-white"
                  } hover:text-orange-400 transition-colors duration-300`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="px-4  pb-8 mt-8 text-white text-sm">
              <div className="h-[0.5px] bg-white -translate-y-2"></div>
              <p className="mb-4 max-w-md leading-relaxed">
                5F 12-30, Simin-daero 327beon-gil, Dongan-gu, Anyang-si,
                Gyeonggi-do, Republic of Korea
              </p>
              <p className="mb-4">Tel 02. 851. 2662 / Fax 02. 851. 2655</p>

              <div className="mb-4">
                <Link
                  href="/map"
                  className="text-white hover:text-orange-500 transition-colors duration-300"
                >
                  View Map
                </Link>
              </div>

              <div className="mb-4">
                <div className="mb-1">Company</div>
                <Link
                  href="mailto:support@maxius.io"
                  className="text-white hover:text-orange-500 transition-colors duration-300"
                >
                  support@maxius.io
                </Link>
              </div>

              <div>
                <div className="mb-1">Technical support</div>
                <Link
                  href="mailto:support@maxius.io"
                  className="text-white hover:text-orange-500 transition-colors duration-300"
                >
                  support@maxius.io
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
