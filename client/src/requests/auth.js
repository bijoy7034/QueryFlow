import API from "../utils/api";

export const register_request = async (set, userData) => {
    try {
        set({ loading: true, error: null });
        const response = await API.post("/auth/register", userData);
        set({ loading: false, user: response.data.user, token: response.data.token, is_logged_in: true });
        return response.data;
    } catch (error) {
        set({ loading: false, error: error.response ? error.response.data.message : error.message });
    }
}