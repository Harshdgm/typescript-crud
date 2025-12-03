"use client";

import { useState, useEffect } from "react";
import { UserData,DateRangeData } from "@/types/user";
// import { deleteUserById } from "@/utils/usersStore";
import ReusableTable, { Column } from "@/common/ReusableTable";
import EditUserModal from "@/components/AdvanceTable/EditUserModal";
import { toCamelCase } from "@/utils/toCamelCase";

const userColumns: Column<UserData>[] = [
  { key: "id", label: "ID" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  {
    key: "address",
    label: "Address",
    render: (item) => `${item.city}${item.state ? ", " + item.state : ""}${item.country ? ", " + item.country : ""}`,
  },
  {
  key: "dateRange",
  label: "Date Range",
  render: (item) =>
  item.dateRange
    ? `${new Date(item.dateRange.startDate).toLocaleString()} - ${new Date(item.dateRange.endDate).toLocaleString()}`
    : ""
  },
  { key: "image", label: "Image", isImage: true },
  { key: "hobby", label: "Hobby", render: (item) => toCamelCase(Array.isArray(item.hobby) ? item.hobby.join(", ") : item.hobby ?? "")  },
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
    let newUsers = users.filter((u) => u.id !== user.id);
    newUsers = newUsers.sort((a, b) => a.id - b.id);
    newUsers = newUsers.map((u, index) => ({...u,id: index + 1}));
    setUsers(newUsers);
    sessionStorage.setItem("usersData", JSON.stringify(newUsers));
  };

  const handleSave = (updatedUser: UserData) => {
    const newUsers = users.map((u) =>u.id === updatedUser.id ? updatedUser : u);
    setUsers(newUsers);
    setSelectedUser(null);
  };

  return (
     <div className="w-full overflow-x-auto">
      <div className="min-w-[1080px]">
      <ReusableTable<UserData>
        data={users}
        columns={userColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      </div>

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
