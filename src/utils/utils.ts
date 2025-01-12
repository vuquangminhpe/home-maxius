export const getI18nextLngFromStorage = () => {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem("i18nextLng") || "en";
};

export const setI18nextLngFromLocalStorage = (lng: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("i18nextLng", lng);
};
