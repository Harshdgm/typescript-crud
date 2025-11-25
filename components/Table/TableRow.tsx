'use client';

import { User } from "@/types/user";
import TableActions from "./TableActions";

interface TableRowProps {
  user: User;
  deleteUser: (userId: number) => void;
}

export default function TableRow({ user, deleteUser }: TableRowProps) {
  return (
    <tr>
      <td className="border p-2">{user.id}</td>
      <td className="border p-2">{user.name}</td>
      <td className="border p-2">{user.email}</td>
      <td className="border p-2">
        <TableActions userId={user.id} deleteUser={deleteUser} />
      </td>
    </tr>
  );
}
