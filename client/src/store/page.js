import { create } from "zustand";
import useAuthStore from "./auth";

const usePageStore = create((set) => ({
  page: "login",
  setPage: (newPage) => {
    set({ page: newPage });
    const { clearError } = useAuthStore.getState();
    clearError();
  },
}));

export default usePageStore;
