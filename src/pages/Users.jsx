import { useEffect, useState } from "react";
import { initialUsers } from "../data/users";
import UserModal from "../components/UserModal";
import { logActivity } from "../utils/activityLogger";
import { showToast } from "../utils/toast";
import { getStoredUsers, setStoredUsers } from "../utils/storage";
import Card from "../components/Card";

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

  /* -------------------- INIT USERS (SAFE) -------------------- */
  useEffect(() => {
    const storedUsers = getStoredUsers();

    if (storedUsers && storedUsers.length > 0) {
      setUsers(storedUsers);
    } else {
      setUsers(initialUsers);
      setStoredUsers(initialUsers);
    }

    setTimeout(() => setLoading(false), 300);
  }, []);

  /* -------------------- CENTRAL UPDATE FUNCTION -------------------- */
  const updateUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    setStoredUsers(updatedUsers);
    window.dispatchEvent(new Event("users-updated"));
  };

  /* -------------------- SORTING -------------------- */
  const sortUsers = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  /* -------------------- FILTERING -------------------- */
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = filterRole ? user.role === filterRole : true;

    return matchesSearch && matchesRole;
  });

  /* -------------------- SORT + PAGINATE -------------------- */
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
    return <p className="p-8 text-gray-500">Loading users…</p>;
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>

        {userRole === "Admin" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition"
          >
            Add User
          </button>
        )}
      </div>

      {/* Filters */}
      <Card className="p-4 flex flex-col sm:flex-row gap-4">
        <input
          className="border px-4 py-2 rounded-lg w-full max-w-sm text-sm"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="border px-4 py-2 rounded-lg text-sm"
          value={filterRole}
          onChange={(e) => {
            setFilterRole(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="text-xs uppercase tracking-wide text-gray-400">
            <tr>
              <th className="p-4 cursor-pointer" onClick={() => sortUsers("name")}>
                Name
              </th>
              <th className="p-4">Email</th>
              <th className="p-4 cursor-pointer" onClick={() => sortUsers("role")}>
                Role
              </th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t text-sm hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4 space-x-3">
                  {userRole === "Admin" && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          const updated = users.filter(
                            (u) => u.id !== user.id
                          );
                          updateUsers(updated);
                          logActivity(`Deleted user: ${user.name}`);
                          showToast("User deleted");
                        }}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* Pagination */}
      <div className="flex gap-2">
        {Array.from({
          length: Math.ceil(filteredUsers.length / USERS_PER_PAGE),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              currentPage === i + 1
                ? "bg-gray-900 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <UserModal
          user={selectedUser}
          closeModal={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          saveUser={(user) => {
            if (user.id) {
              const updated = users.map((u) =>
                u.id === user.id ? user : u
              );
              updateUsers(updated);
              logActivity(`Updated user: ${user.name}`);
              showToast("User updated");
            } else {
              const updated = [...users, { ...user, id: Date.now() }];
              updateUsers(updated);
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
