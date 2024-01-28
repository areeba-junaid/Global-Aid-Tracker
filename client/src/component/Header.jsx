import React from "react";
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from "react-router-dom";
import { useAuth} from "../contextAPI/AuthContext";

export default function Header() {
  const navigate = useNavigate()
  const { setIsAuthenticated,setAccountAddress,setAccountType } = useAuth();
  const logOut=()=>{

    sessionStorage.clear()
    setIsAuthenticated(false);
    setAccountAddress(null);
    setAccountType("");
    navigate("/");
    
  }
  return (
    <>
      <div className="bg-black h-12 p-2 flex  justify-between items-center  shadow-slate-300 border-b border-gray-500 ">
    
        <div className="flex items-center">
        <LanguageIcon  className="h-8 w-8 text-white" />
          <span className="text-white text-lg ml-2">Global Aid</span>
        </div>
        <button onClick={logOut}className="bg-white text-blue-500 px-7 py-2 rounded-lg focus:outline-none hover:bg-gray-100">
          LogOut
        </button>
      </div>
    </>
  );
}
