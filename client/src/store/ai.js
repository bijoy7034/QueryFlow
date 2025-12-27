// store/ai.js
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
      
      // Ask AI
      ask: (query) => ask_request(set, query),
      
      // Clear error
      clearError: () => set({ error: null }),
      
      // Clear current query/response
      clearCurrent: () => set({ 
        currentQuery: null, 
        currentResponse: null,
        isMarkdown: false,
        error: null 
      }),
      
      // Clear history
      clearHistory: () => set({ queryHistory: [] }),
      
      // Set loading state
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: "ai-storage", // localStorage key
      partialize: (state) => ({ 
        queryHistory: state.queryHistory // Only persist history
      }),
    }
  )
);

export default useAIStore;