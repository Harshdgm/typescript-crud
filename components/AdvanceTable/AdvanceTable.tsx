"use client";

import { useState, useEffect } from "react";
import { UserData } from "@/types/user";
import { deleteUserById } from "@/utils/usersStore";
import ReusableTable, { Column } from "@/common/ReusableTable";
import EditUserModal from "@/components/AdvanceTable/EditUserModal";
import { toCamelCase } from "@/utils/toCamelCase";

const userColumns: Column<UserData>[] = [
  { key: "id", label: "ID" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address", render: (item) => toCamelCase(item.address ?? "") },
  { key: "image", label: "Image", isImage: true },
  { key: "hobby", label: "Hobby", render: (item) => toCamelCase(item.hobby ?? "") },
  { key: "actions", label: "Actions" },
];

export default function AdvanceTable({ data }: { data: UserData[] }) {
  const [users, setUsers] = useState<UserData[]>([]); 
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("usersData");
      setUsers(saved ? JSON.parse(saved) : data);
    }
  }, [data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("usersData", JSON.stringify(users));
    }
  }, [users]);

  const handleEdit = (user: UserData) => setSelectedUser(user);

  const handleDelete = (user: UserData) => {
    const newUsers = users.filter((u) => u.id !== user.id);
    setUsers(newUsers);
    deleteUserById(user.id); 
  };

  const handleSave = (updatedUser: UserData) => {
    const newUsers = users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    setUsers(newUsers);
    setSelectedUser(null);
  };

  return (
    <div>
      <ReusableTable<UserData>
        data={users}
        columns={userColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
