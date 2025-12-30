import { useEffect, useState } from "react";

const UserModal = ({ closeModal, saveUser, user }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Viewer",
    status: "Active",
  });

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser(form);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">
          {user ? "Edit User" : "Add User"}
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 px-4 py-2 border rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <select
          className="w-full mb-3 px-4 py-2 border rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>

        <select
          className="w-full mb-6 px-4 py-2 border rounded"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserModal;
