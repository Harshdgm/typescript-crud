'use client';

import Table from "@/components/Table/Table";
import { useUsers } from "@/hooks/useUsers";
import { User } from "@/types/user";

export default function Home() {
  const { users, deleteUser, editUser, addUser} = useUsers();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Users Data:</h1>
       <button
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        onClick={() =>
          addUser({
            id: Date.now(),
            name: "New User",
            email: "newuser@example.com",
          } as User)
        }
      >
        Add User
      </button>
      <Table rows={users} deleteUser={deleteUser} editUser={editUser} />
    </div>
  );
}
