import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ask_request } from "../requests/ai";

const useAIStore = create(
  persist(
    (set) => ({
      loading: false,
      error: null,
      currentQuery: null,
      currentResponse: null,
      isMarkdown: false,
      queryHistory: [],
      
      ask: (query) => ask_request(set, query),
      

      clearError: () => set({ error: null }),

      clearCurrent: () => set({ 
        currentQuery: null, 
        currentResponse: null,
        isMarkdown: false,
        error: null 
      }),
      
      clearHistory: () => set({ queryHistory: [] }),
      

      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "ai-storage", 
      partialize: (state) => ({ 
        queryHistory: state.queryHistory 
      }),
    }
  )
);

export default useAIStore;