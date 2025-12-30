export const getStoredUsers = () => {
  const stored = localStorage.getItem("users");
  return stored ? JSON.parse(stored) : null;
};

export const setStoredUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};
