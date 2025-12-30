import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-neutral-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Dashboard Overview
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded shadow-sm">
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">128</p>
            </div>

            <div className="bg-white p-5 rounded shadow-sm">
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-gray-800">94</p>
            </div>

            <div className="bg-white p-5 rounded shadow-sm">
              <p className="text-sm text-gray-500">Inactive Users</p>
              <p className="text-2xl font-bold text-gray-800">34</p>
            </div>

            <div className="bg-white p-5 rounded shadow-sm">
              <p className="text-sm text-gray-500">New This Week</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
