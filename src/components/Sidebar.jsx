import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-72 p-4 bg-white/80 backdrop-blur-md border-r border-gray-100">
      <div className="text-xl font-semibold text-gray-900 px-4 py-4">
        InsightHub
      </div>

      <nav className="space-y-1 mt-6">
        {[
          { name: "Dashboard", path: "/" },
          { name: "Users", path: "/users" },
          { name: "Activity Logs", path: "/activity" },
        ].map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
