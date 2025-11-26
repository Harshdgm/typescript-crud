'use client';

import Table from "@/components/Table/Table";
import { useUsers } from "@/hooks/useUsers";

export default function Home() {
  const { users, deleteUser, editUser, addUser} = useUsers();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center px-2">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Users Data:</h1>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        onClick={addUser}
      >
        Add User
      </button>
      </div>
      <Table rows={users} deleteUser={deleteUser} editUser={editUser} />
    </div>
  );
}
