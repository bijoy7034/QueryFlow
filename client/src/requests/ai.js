import API from "../utils/api";
import useAuthStore from "../store/auth";

export const ask_request = async (set, query) => {
  try {
    set({ loading: true, error: null, currentQuery: query });

    const token = useAuthStore.getState().token;
    
    if (!token) {
      set({
        error: "Authentication required. Please login.",
        loading: false,
        currentResponse: null,
      });
      return {
        success: false,
        message: "Authentication required"
      };
    }

    const response = await API.post("/ai/ask", null, {
      params: { query },
      headers: {
        Authorization: `Bearer ${token}`
      }
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
    
    if (typeof aiResponse !== 'string') {
      if (typeof aiResponse === 'object' && aiResponse !== null) {
        if (aiResponse.text) {
          aiResponse = aiResponse.text;
        } else if (Array.isArray(aiResponse)) {
          aiResponse = aiResponse
            .map(item => {
              if (typeof item === 'string') return item;
              if (item.text) return item.text;
              return JSON.stringify(item);
            })
            .join('\n');
        } else {
          aiResponse = JSON.stringify(aiResponse, null, 2);
        }
      } else {
        aiResponse = String(aiResponse);
      }
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
    
    if (error.response?.status === 401) {
      errorMessage = "Session expired. Please login again.";
      const { logout } = useAuthStore.getState();
      logout();
    } else if (error.response?.status === 503) {
      errorMessage = "Service temporarily unavailable. Agent is initializing...";
    } else if (error.response?.data?.detail) {
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