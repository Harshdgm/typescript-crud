"use client";

import { useState, useEffect, useMemo } from "react";
import { UserData } from "@/types/user";
import ReusableTable, { Column } from "@/common/ReusableTable";
import EditUserModal from "@/components/AdvanceTable/EditUserModal";
import { toCamelCase } from "@/utils/toCamelCase";
import { useLabels } from "@/hooks/useLabels";
import EditAllUsersPanel from "./EditAllUsersModal";

export default function AdvanceTable({ data }: { data: UserData[] }) {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [editAll, setEditAll] = useState(false);
  const labels = useLabels();

  useEffect(() => {
    const saved = sessionStorage.getItem("usersData");
    setUsers(saved ? JSON.parse(saved) : data);
  }, [data]);

  useEffect(() => {
    sessionStorage.setItem("usersData", JSON.stringify(users));
  }, [users]);

  const handleEdit = (user: UserData) => setSelectedUser(user);

  const handleDelete = (user: UserData) => {
    const newUsers = users
      .filter((u) => u.id !== user.id)
      .sort((a, b) => a.id - b.id)
      .map((u, index) => ({ ...u, id: index + 1 }));

    setUsers(newUsers);
  };

  const handleSave = (updated: UserData) => {
    setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
    setSelectedUser(null);
  };

  const userColumns: Column<UserData>[] = useMemo(
    () => [
      { key: "id", label: labels.id },
      { key: "email", label: labels.email },
      { key: "phone", label: labels.phone },
      {
        key: "address",
        label: labels.address,
        render: (item) =>
          `${item.city}${item.state ? ", " + item.state : ""}${
            item.country ? ", " + item.country : ""
          }`,
      },
      {
        key: "dateRange",
        label: labels.date_range,
        render: (item) =>
          item.dateRange
            ? `${new Date(item.dateRange.startDate).toLocaleString("en-US", {
                timeZone: "UTC",
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })} - ${new Date(item.dateRange.endDate).toLocaleString("en-US", {
                timeZone: "UTC",
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}`
            : "",
      },
      { key: "image", label: labels.image, isImage: true },
      {
        key: "hobby",
        label: labels.hobby,
        render: (item) =>
          toCamelCase(
            Array.isArray(item.hobby)
              ? item.hobby.join(", ")
              : item.hobby ?? ""
          ),
      },
      { key: "actions", label: labels.actions },
    ],
    [labels]
  );

  return (
    <div className="w-full overflow-x-auto">
      {!editAll && (
        <div className="w-full flex justify-end mb-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={() => setEditAll(true)}
          >
            {labels.all_edit_users}
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
