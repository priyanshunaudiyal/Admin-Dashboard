import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-6 text-xl font-semibold text-gray-800">AdminPanel</div>

      <nav className="px-4 space-y-2">
        <NavLink
          to="/"
          className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/users"
          className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
        >
          Users
        </NavLink>

        <NavLink
          to="/activity"
          className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
        >
          Activity Logs
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
