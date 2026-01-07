import usePageStore from "../store/page";
import API from "../utils/api";


export const register_request = async (set, userData) => {
  try {
    set({ loading: true, error: null });

    const response = await API.post("/user/register", userData);

    if (response.data.error) {
      set({
        error: response.data.error,
        loading: false,
      });
      return { success: false, message: response.data.error };
    }

    set({ loading: false });

    return {
      success: true,
      message: "Registration successful",
      data: response.data,
    };
  } catch (error) {
    set({
      loading: false,
      error: error.response?.data?.message || error.message,
    });

    return { success: false, message: "Registration failed" };
  }
};

export const login_request = async (set, credentials) => {
    try {
        set({
            loading: true,
            error: null
        });
        const res = await API.post("/user/login", credentials);
        if (res.data.error) {
            set({
                error: res.data.error,
                loading: false,
            });
            return {
                success: false,
                message: res.data.error
            };
        }
        if (res) {
            set({
                loading: false,
                user: res.data.user,
                token: res.data.access_token,
                is_logged_in: true
            });
            const {setPage} = usePageStore.getState()
            setPage('dashboard')
        }
        return {
            success: true,
            message: "Login successful",
            data: res.data
        };
    } catch (error) {
        set({
            error: "Invalid username or password",
            loading: false,
        });
    }
    return {
        success: false,
        message: "Login failed"
    };
}