'use client';

import TableRow from "./TableRow";
import { User } from "@/types/user";

interface TableProps {
  rows: User[];
  deleteUser: (userId: number) => void;
}

export default function Table({ rows, deleteUser }: TableProps) {
  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((user) => (
          <TableRow key={user.id} user={user} deleteUser={deleteUser} />
        ))}
      </tbody>
    </table>
  );
}
