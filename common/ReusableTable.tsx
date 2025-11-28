"use client";

import { useState } from "react";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditUserModal from "@/components/AdvanceTable/EditUserModal";
import { UserData } from "@/types/user";

export type Column = {
  key: keyof UserData | "actions";
  label: string;
  isImage?: boolean;
  render?: (item: UserData) => React.ReactNode; 
};

interface ReusableTableProps {
  data: UserData[];
  columns: Column[];
  onEdit?: (item: UserData) => void;
  onDelete?: (item: UserData) => void;
}

export default function ReusableTable({
  data,
  columns,
  onEdit,
  onDelete,
}: ReusableTableProps) {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const handleSave = (updatedUser: UserData) => {
    const existingData = sessionStorage.getItem("usersData");
    const cache: UserData[] = existingData ? JSON.parse(existingData) : [];
    const newCache = cache.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    sessionStorage.setItem("usersData", JSON.stringify(newCache));
    window.dispatchEvent(new Event("storage"));
    setSelectedUser(null);
  };

  return (
    <div className="overflow-x-auto text-center">
      <div
        className="grid mb-2"
        style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
      >
        {columns.map((col, index) => {
          let classes = "p-2 font-bold bg-gray-100 border border-black";

          if (index === 0) classes += " rounded-tl-2xl rounded-bl-2xl"; 
          if (index === columns.length - 1) classes += " rounded-tr-2xl rounded-br-2xl";

          return (
            <div key={String(col.key)} className={classes}>
              {col.label}
            </div>
          );
        })}
      </div>

      {data.map((user, rowIndex) => (
        <div
          key={user.id}
          className={`mb-1 rounded-2xl ${rowIndex % 2 === 0 ? "" : "bg-gray-100"}`}
        >
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
          >
            {columns.map((col, colIndex) => {
              let cellClasses = "p-2 border";

              if (col.key === "actions") {
                if (colIndex === 0) cellClasses += " rounded-tl-2xl rounded-bl-2xl";
                if (colIndex === columns.length - 1) cellClasses += " rounded-tr-2xl rounded-br-2xl";

                return (
                  <div key="actions" className={cellClasses + " flex items-center justify-center gap-2"}>
                    {onEdit && (
                      <FiEdit
                        className="cursor-pointer"
                        onClick={() => setSelectedUser(user)}
                      />
                    )}
                    {onDelete && (
                      <RiDeleteBin6Line
                        className="text-red-500 h-5 w-5"
                        onClick={() => onDelete(user)}
                      />
                    )}
                  </div>
                );
              }

              const value = user[col.key as keyof UserData];

              if (col.render) {
                return (
                  <div key={String(col.key)} className={cellClasses}>
                    {col.render(user)}
                  </div>
                );
              }

              if (col.isImage && typeof value === "string") {
                return (
                  <div key={String(col.key)} className={cellClasses + " flex items-center justify-center p-1"}>
                    <Image
                      src={value}
                      alt=""
                      width={64}
                      height={64}
                      className="w-16 h-10 object-cover rounded"
                    />
                  </div>
                );
              }

              if (colIndex === 0) cellClasses += " rounded-tl-2xl rounded-bl-2xl";
              if (colIndex === columns.length - 1) cellClasses += " rounded-tr-2xl rounded-br-2xl";

              return <div key={String(col.key)} className={cellClasses}>{String(value ?? "")}</div>;
            })}
          </div>
        </div>
      ))}

      {/* Edit Modal */}
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
