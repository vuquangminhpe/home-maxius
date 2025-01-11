export const getI18nextLngFromStorage = () => {
  return localStorage.getItem("i18nextLng") || "en";
};

export const setI18nextLngFromLocalStorage = (newLng: string) => {
  localStorage.setItem("i18nextLng", newLng);
};
