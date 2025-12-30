import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!name || !email || !password) return;

    localStorage.setItem("isAuth", "true");
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", "Admin"); // demo role
    localStorage.setItem("lastLogin", new Date().toLocaleString());

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef2f7] to-[#f7f9fc]">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Welcome back
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to continue
        </p>

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-3 text-sm"
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-3 text-sm"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-5 text-sm"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
