'use client';

import TableRow from "./TableRow";
import { User } from "@/types/user";

interface TableProps {
  rows: User[];
  deleteUser: (userId: number) => void;
  editUser: (userId: number, newData: Partial<User>) => void;
}

export default function Table({ rows, deleteUser, editUser }: TableProps) {
  return (
    <table className="w-full border-2 border-gray-300 rounded-lg overflow-hidden">
      <thead className="bg-blue-100">
        <tr>
          <th className="border-b-2 p-2 ">ID</th>
          <th className="border-b-2 p-2">Name</th>
          <th className="border-b-2 p-2">Email</th>
          <th className="border-b-2 p-2">Actions</th>
        </tr>
      </thead>
      <tbody className="text-center bg-gray-200">
      {rows.map((user) => (
        <TableRow
          key={user.id}
          user={user}
          deleteUser={deleteUser}
          editUser={editUser}
          isNew={user.isNew}
        />
      ))}
    </tbody>
    </table>
  );
}
