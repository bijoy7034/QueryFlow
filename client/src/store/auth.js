import { create } from "zustand"
import { register_request } from "../requests/auth"

const useAuthStore = create((set)=>({
    loading: false,
    error: null,
    user: null,
    token: null,
    is_logged_in: false,
    register: (userData)=> register_request(set, userData),
    logout: ()=> set({ user: null, token: null, is_logged_in: false }),
}))

export default useAuthStore