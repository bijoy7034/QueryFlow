import API from "../utils/api";

export const register_request = async (set, userData) => {
    try {
        set({
            loading: true,
            error: null
        });
        const response = await API.post("/auth/register", userData);
        set({
            loading: false,
            user: response.data.user
        });
        return {
            success: true,
            message: "Registration successful",
            data: response.data
        };
    } catch (error) {
        set({
            loading: false,
            error: error.response ? error.response.data.message : error.message
        });
        return {
            success: false,
            message: "Registration failed"
        };
    }
}
export const login_request = async (set, credentials) => {
    try {
        set({
            loading: true,
            error: null
        });
        const res = await API.post("/auth/login", credentials);
        if (res) {
            set({
                loading: false,
                user: res.data.user,
                token: res.data.access_token,
                is_logged_in: true
            });
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