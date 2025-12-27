import { create } from "zustand";
import { ask_request } from "../requests/ai";


const useAIStore = create((set) => ({
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
}));

export default useAIStore;