import { useEffect, useState } from "react";

const Activity = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(JSON.parse(localStorage.getItem("activityLogs")) || []);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Activity Logs</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Action</th>
            <th className="p-4">By</th>
            <th className="p-4">Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="p-4">{log.action}</td>
              <td className="p-4">{log.performedBy}</td>
              <td className="p-4">{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Activity;
