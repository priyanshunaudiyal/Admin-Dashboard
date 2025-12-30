import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useDashboardStats } from "../hooks/useDashboardStats";
import CountUp from "../components/CountUp";
import UserStatusChart from "../components/UserStatusChart";
import Card from "../components/Card";

const Dashboard = () => {
  const { total, active, inactive, newThisWeek } = useDashboardStats();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#eef2f7] via-[#f7f9fc] to-[#eef2f7]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Dashboard Overview
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard label="Total Users" value={total} />
            <StatCard label="Active Users" value={active} />
            <StatCard label="Inactive Users" value={inactive} />
            <StatCard label="New This Week" value={newThisWeek} />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <UserStatusChart active={active} inactive={inactive} />
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <Card className="p-6">
    <p className="text-sm text-gray-500 mb-2">{label}</p>
    <p className="text-3xl font-semibold text-gray-900">
      <CountUp value={value} />
    </p>
  </Card>
);

export default Dashboard;
