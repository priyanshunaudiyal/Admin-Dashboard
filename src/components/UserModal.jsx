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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveUser(form);
          closeModal();
        }}
        className="bg-white p-6 rounded w-full max-w-md"
      >
        <h2 className="text-xl mb-4">{user ? "Edit User" : "Add User"}</h2>

        <input className="border px-4 py-2 mb-3 w-full" placeholder="Name"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input className="border px-4 py-2 mb-3 w-full" placeholder="Email"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <select className="border px-4 py-2 mb-3 w-full"
          value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>

        <select className="border px-4 py-2 mb-4 w-full"
          value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={closeModal} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserModal;
