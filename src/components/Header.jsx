import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "");
    setRole(localStorage.getItem("userRole") || "User");
    setLastLogin(localStorage.getItem("lastLogin") || "");
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const saveName = () => {
    localStorage.setItem("userName", userName);
    setEditing(false);
    setIsOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="h-16 px-8 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-gray-100">
      {/* Left */}
      <div>
        <p className="text-sm text-gray-700">
          Welcome back{userName ? `, ${userName}` : ""} 👋
        </p>
        {lastLogin && (
          <p className="text-xs text-gray-400">
            Last login: {lastLogin}
          </p>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Role badge */}
        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
          {role}
        </span>

        {/* Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium focus:outline-none"
          >
            {initials}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border p-3 z-50">
              {editing ? (
                <>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full border px-3 py-2 text-sm rounded mb-2"
                    autoFocus
                  />
                  <button
                    onClick={saveName}
                    className="w-full text-sm bg-gray-900 text-white py-2 rounded"
                  >
                    Save Name
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditing(true)}
                    className="w-full text-left text-sm px-2 py-2 rounded hover:bg-gray-50"
                  >
                    Edit Name
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left text-sm px-2 py-2 rounded text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
