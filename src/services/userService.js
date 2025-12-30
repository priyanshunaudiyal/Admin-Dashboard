// for later use
const USE_API = false;

const API_URL = "https://api.example.com/users";

export const fetchUsers = async () => {
  if (USE_API) {
    const res = await fetch(API_URL);
    return res.json();
  }
  return JSON.parse(localStorage.getItem("users")) || [];
};

export const saveUsers = async (users) => {
  if (USE_API) {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users),
    });
  } else {
    localStorage.setItem("users", JSON.stringify(users));
  }
};
