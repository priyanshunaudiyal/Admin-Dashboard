import { useEffect, useState } from "react";

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    newThisWeek: 0,
  });

  const calculateStats = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const now = new Date();

    const total = users.length;
    const active = users.filter((u) => u.status === "Active").length;
    const inactive = users.filter((u) => u.status === "Inactive").length;

    const newThisWeek = users.filter((u) => {
      const createdAt = new Date(u.id); // using id timestamp
      const diff = (now - createdAt) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }).length;

    setStats({ total, active, inactive, newThisWeek });
  };

  useEffect(() => {
    calculateStats();

    // Listen to changes across tabs & routes
    window.addEventListener("storage", calculateStats);
    return () => window.removeEventListener("storage", calculateStats);
  }, []);

  return stats;
};
