import { NavLink } from "react-router-dom";
import { Landmark, UserCog ,CreditCard } from "lucide-react"; 

export const NavBar = () => {
  return (
    <nav className="w-full flex justify-center items-center gap-5 p-4 font-semibold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-xl mb-10 shadow-lg">
      
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-1 rounded transition-colors duration-300 ${
            isActive ? "text-white bg-blue-600" : "text-gray-300 hover:text-white"
          }`
        }
      >
        <Landmark size={18} />
        Inicio
      </NavLink>

      <NavLink
        to="/cajero"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-1 rounded transition-colors duration-300 ${
            isActive ? "text-white bg-blue-600" : "text-gray-300 hover:text-white"
          }`
        }
      >
        <CreditCard size={18} />
        Cajero
      </NavLink>

      <NavLink
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-1 rounded transition-colors duration-300 ${
            isActive ? "text-white bg-blue-600" : "text-gray-300 hover:text-white"
          }`
        }
      >
        <UserCog size={18} />
        Admin
      </NavLink>
    </nav>
  );
};
