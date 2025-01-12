// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import navbar_en from "@/app/locales/en/navbar.json";
import page1_en from "@/app/locales/en/page1.json";
import page2_en from "@/app/locales/en/page2.json";
import page3_en from "@/app/locales/en/page3.json";
import page4_en from "@/app/locales/en/page4.json";
import page5_en from "@/app/locales/en/page5.json";

import navbar_kr from "@/app/locales/kr/navbar.json";
import page1_kr from "@/app/locales/kr/page1.json";
import page2_kr from "@/app/locales/kr/page2.json";
import page3_kr from "@/app/locales/kr/page3.json";
import page4_kr from "@/app/locales/kr/page4.json";
import page5_kr from "@/app/locales/kr/page5.json";
import useStore from "@/globalState/store";
import LanguageDetector from "i18next-browser-languagedetector";

const initI18n = () => {
  const initialLanguage = useStore.getState().i18nextLng;
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          navbar: navbar_en,
          page1: page1_en,
          page2: page2_en,
          page3: page3_en,
          page4: page4_en,
          page5: page5_en,
        },
        kr: {
          navbar: navbar_kr,
          page1: page1_kr,
          page2: page2_kr,
          page3: page3_kr,
          page4: page4_kr,
          page5: page5_kr,
        },
      },
      lng: initialLanguage,
      fallbackLng: "en",
      ns: ["navbar", "page1", "page2", "page3", "page4", "page5"],
      defaultNS: "navbar",
      interpolation: {
        escapeValue: false,
      },
    });

  useStore.subscribe((state) => {
    if (i18n.language !== state.i18nextLng) {
      i18n.changeLanguage(state.i18nextLng);
    }
  });
};

if (!i18n.isInitialized) {
  initI18n();
}

export default i18n;
