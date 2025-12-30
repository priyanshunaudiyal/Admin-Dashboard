import { useEffect, useState } from "react";

const Activity = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("activityLogs")) || [];
    setLogs(storedLogs);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Activity Logs</h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-4">Action</th>
              <th className="p-4">Performed By</th>
              <th className="p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t text-sm">
                <td className="p-4">{log.action}</td>
                <td className="p-4">{log.performedBy}</td>
                <td className="p-4">{log.timestamp}</td>
              </tr>
            ))}

            {logs.length === 0 && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No activity recorded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activity;
