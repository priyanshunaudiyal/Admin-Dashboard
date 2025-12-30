import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "./Card";

const UserStatusChart = ({ active, inactive }) => {
  const data = [
    { name: "Active", value: active },
    { name: "Inactive", value: inactive },
  ];

  return (
    <Card className="p-6 h-80">
      <p className="text-sm text-gray-500 mb-4">User Status</p>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#111827"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default UserStatusChart;
