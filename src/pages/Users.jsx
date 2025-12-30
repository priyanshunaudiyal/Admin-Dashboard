import { useEffect, useState } from "react";
import { initialUsers } from "../data/users";
import UserModal from "../components/UserModal";
import { logActivity } from "../utils/activityLogger";
import { showToast } from "../utils/toast";

const USERS_PER_PAGE = 5;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    setUsers(storedUsers || initialUsers);
    setTimeout(() => setLoading(false), 400);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const sortUsers = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = filterRole ? user.role === filterRole : true;

    return matchesSearch && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortKey) return 0;
    return sortOrder === "asc"
      ? a[sortKey].localeCompare(b[sortKey])
      : b[sortKey].localeCompare(a[sortKey]);
  });

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  if (loading) {
    return <p className="p-6">Loading users...</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Users</h1>
        {userRole === "Admin" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        )}
      </div>

      <input
        className="border px-4 py-2 mb-4 w-full max-w-sm"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 cursor-pointer" onClick={() => sortUsers("name")}>Name</th>
            <th className="p-4">Email</th>
            <th className="p-4 cursor-pointer" onClick={() => sortUsers("role")}>Role</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>
              <td className="p-4">{user.status}</td>
              <td className="p-4 space-x-2">
                {userRole === "Admin" && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setUsers(users.filter((u) => u.id !== user.id));
                        logActivity(`Deleted user: ${user.name}`);
                        showToast("User deleted");
                      }}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2 mt-4">
        {Array.from({
          length: Math.ceil(filteredUsers.length / USERS_PER_PAGE),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <UserModal
          user={selectedUser}
          closeModal={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          saveUser={(user) => {
            if (user.id) {
              setUsers(users.map((u) => (u.id === user.id ? user : u)));
              logActivity(`Updated user: ${user.name}`);
              showToast("User updated");
            } else {
              setUsers([...users, { ...user, id: Date.now() }]);
              logActivity(`Added user: ${user.name}`);
              showToast("User added");
            }
          }}
        />
      )}
    </div>
  );
};

export default Users;
