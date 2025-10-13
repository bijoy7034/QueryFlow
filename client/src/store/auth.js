import { create } from "zustand"
import { login_request, register_request } from "../requests/auth"

const useAuthStore = create((set)=>({
    loading: false,
    error: null,
    user: null,
    token: null,
    is_logged_in: false,
    register: (userData)=> register_request(set, userData),
    login: (credential) => login_request(set, credential),
    logout: ()=> set({ user: null, token: null, is_logged_in: false }),

    clearError: ()=> set({error: null})
}))

export default useAuthStore