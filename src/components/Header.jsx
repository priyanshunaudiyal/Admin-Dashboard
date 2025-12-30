import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isAuth");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-medium text-gray-700">
        Internal Admin Dashboard
      </h2>

      <button
        onClick={logout}
        className="text-sm text-gray-600 hover:text-gray-900"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
