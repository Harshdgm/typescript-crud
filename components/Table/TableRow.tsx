'use client';

import { useState } from "react";
import { User } from "@/types/user";

interface TableRowProps {
  user: User;
  editUser: (userId: number, newData: Partial<User>) => void;
  deleteUser: (userId: number) => void;
}

export default function TableRow({ user, editUser, deleteUser }: TableRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);

  const handleEditSave = () => {
    if (isEditing) {
      editUser(user.id, { name: editedName, email: editedEmail });
    }
    setIsEditing(!isEditing);
  };

  return (
    <tr>
      <td className="border p-2">{user.id}</td>
      <td className="border p-2">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="border p-1 w-full"
          />
        ) : (
          user.name
        )}
      </td>
      <td className="border p-2">
        {isEditing ? (
          <input
            type="email"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            className="border p-1 w-full"
          />
        ) : (
          user.email
        )}
      </td>
      <td className="border p-2 flex gap-2">
        <button
          className="text-blue-500 cursor-pointer"
          onClick={handleEditSave}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          className="text-red-500 cursor-pointer"
          onClick={() => deleteUser(user.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
