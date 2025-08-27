import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="w-full flex justify-center items-center gap-10 p-4 font-semibold bg-gray-800 rounded-xl mb-10">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-green-700 px-3 py-1 rounded duration-400"
            : "text-gray-300 hover:text-white"
        }
      >
        Cajero
      </NavLink>

      <NavLink
        to="/admin"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-green-700 px-3 py-1 rounded duration-400"
            : "text-gray-300 hover:text-white"
        }
      >
        Admin
      </NavLink>
    </nav>
  );
};