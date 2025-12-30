export const logActivity = (action) => {
  const existingLogs = JSON.parse(localStorage.getItem("activityLogs")) || [];

  const newLog = {
    id: Date.now(),
    action,
    performedBy: "Admin",
    timestamp: new Date().toLocaleString(),
  };

  localStorage.setItem(
    "activityLogs",
    JSON.stringify([newLog, ...existingLogs])
  );
};
