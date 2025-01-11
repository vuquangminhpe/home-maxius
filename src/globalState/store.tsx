import {
  getI18nextLngFromStorage,
  setI18nextLngFromLocalStorage,
} from "@/utils/utils";
import { create } from "zustand";
interface Store {
  i18nextLng: string;
  setI18nextLng: (newLng: string) => void;
}
const useStore = create<Store>((set) => ({
  i18nextLng: "en",
  setI18nextLng: (newLng) =>
    set((state) => {
      const updatedLng = newLng || getI18nextLngFromStorage();
      setI18nextLngFromLocalStorage(updatedLng);
      return { ...state, i18nextLng: updatedLng };
    }),
}));
export default useStore;
