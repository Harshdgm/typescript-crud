"use client";

import { useState, useEffect } from "react";
import { UserData } from "@/types/user";
import ReusableTable, { Column } from "@/common/ReusableTable";
import EditUserModal from "@/components/AdvanceTable/EditUserModal";
import { toCamelCase } from "@/utils/toCamelCase";
import EditAllUsersPanel from "./EditAllUsersModal";

const userColumns: Column<UserData>[] = [
  { key: "id", label: "ID" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  {
    key: "address",
    label: "Address",
    render: (item) =>
      `${item.city}${item.state ? ", " + item.state : ""}${
        item.country ? ", " + item.country : ""
      }`,
  },
  {
    key: "dateRange",
    label: "Date Range",
    render: (item) =>
      item.dateRange
        ? `${new Date(item.dateRange.startDate).toLocaleString()} - ${new Date(
            item.dateRange.endDate
          ).toLocaleString()}`
        : "",
  },
  { key: "image", label: "Image", isImage: true },
  {
    key: "hobby",
    label: "Hobby",
    render: (item) =>
      toCamelCase(
        Array.isArray(item.hobby)
          ? item.hobby.join(", ")
          : item.hobby ?? ""
      ),
  },
  { key: "actions", label: "Actions" },
];

export default function AdvanceTable({ data }: { data: UserData[] }) {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [editAll, setEditAll] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("usersData");
    setUsers(saved ? JSON.parse(saved) : data);
  }, [data]);

  useEffect(() => {
    sessionStorage.setItem("usersData", JSON.stringify(users));
  }, [users]);

  const handleEdit = (user: UserData) => setSelectedUser(user);

  const handleDelete = (user: UserData) => {
    let newUsers = users.filter((u) => u.id !== user.id);

    newUsers = newUsers
      .sort((a, b) => a.id - b.id)
      .map((u, index) => ({ ...u, id: index + 1 }));

    setUsers(newUsers);
    sessionStorage.setItem("usersData", JSON.stringify(newUsers));
  };

  const handleSave = (updated: UserData) => {
    const newUsers = users.map((u) =>
      u.id === updated.id ? updated : u
    );
    setUsers(newUsers);
    setSelectedUser(null);
  };

  return (
    <div className="w-full overflow-x-auto">
      {!editAll && (
        <div className="w-full flex justify-end mb-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={() => setEditAll(true)}
          >
            Edit All Users
          </button>
        </div>
      )}

      {editAll && (
        <EditAllUsersPanel
          users={users}
          onClose={() => setEditAll(false)}
          onSave={(updatedList) => {
            setUsers(updatedList);
            setEditAll(false);
          }}
        />
      )}

      <div className="min-w-[1080px] mt-6">
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
