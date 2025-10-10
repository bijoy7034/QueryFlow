import { Package } from "lucide-react";
import useAuthStore from "../../store/auth";
import usePageStore from "../../store/page";

const Header = () => {
  const {logout, is_logged_in} = useAuthStore()
  const {setPage} = usePageStore()
  return (
    <header className="flex justify-between items-center py-5 border-b border-white/10 mb-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Package className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold">QueryFlow</span>
      </div>
      {is_logged_in && (
        <div className="flex gap-4">
          <button className="px-5 py-2.5 rounded-lg bg-white/10 backdrop-blur-lg text-white text-sm font-medium hover:-translate-y-0.5 transition-all">
            Documentation
          </button>
          <button className="px-5 py-2.5 rounded-lg bg-white/10 backdrop-blur-lg text-white text-sm font-medium hover:-translate-y-0.5 transition-all">
            Settings
          </button>
          <button 
            onClick={()=>{
              logout()
              setPage('login')
            }}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:-translate-y-0.5 transition-all"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;