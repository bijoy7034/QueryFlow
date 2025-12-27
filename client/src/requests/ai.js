// requests/ai.js
import API from "../utils/api";

export const ask_request = async (set, query) => {
  try {
    set({ loading: true, error: null, currentQuery: query });

    const response = await API.post("/ai/ask", null, {
      params: { query }
    });

    if (response.data.error) {
      set({
        error: response.data.error,
        loading: false,
        currentResponse: null,
      });
      return {
        success: false,
        message: response.data.error
      };
    }

    let aiResponse = response.data.response;
    const isMarkdown = response.data.format === "markdown";
    
    // Ensure it's a string
    if (typeof aiResponse !== 'string') {
      aiResponse = JSON.stringify(aiResponse, null, 2);
    }

    set((state) => ({
      loading: false,
      currentResponse: aiResponse,
      isMarkdown: isMarkdown,
      queryHistory: [
        {
          query,
          response: aiResponse,
          isMarkdown: isMarkdown,
          timestamp: new Date().toISOString(),
        },
        ...state.queryHistory,
      ],
    }));

    return {
      success: true,
      message: "Query successful",
      data: aiResponse
    };
  } catch (error) {
    let errorMessage = "Failed to process query";
    
    if (error.response?.data?.detail) {
      errorMessage = error.response.data.detail;
    } else if (error.message) {
      errorMessage = error.message;
    }

    set({
      loading: false,
      error: errorMessage,
      currentResponse: null,
    });
    
    return {
      success: false,
      message: errorMessage
    };
  }
};