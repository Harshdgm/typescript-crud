'use client';

import Table from "@/components/Table/Table";
import { useUsers } from "@/hooks/useUsers";

export default function Home() {
  const { users, deleteUser, editUser } = useUsers();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Users Data:</h1>
      <Table rows={users} deleteUser={deleteUser} editUser={editUser} />
    </div>
  );
}
