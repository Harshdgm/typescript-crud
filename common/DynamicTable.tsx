"use client";

import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Image from "next/image";
import { useState } from "react";
import EditUserModal from "@/components/AdvanceTable/EditUserModal";

type Column<T> = {
  key: keyof T;
  label?: string;
  type?: "text" | "image";
  width?: string;
};

type DynamicTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (id: number) => void;
  renderActions?: (item: T) => React.ReactNode;
};

const getGridCols = (n: number) => {
  switch (n) {
    case 1: return "grid-cols-1";
    case 2: return "grid-cols-2";
    case 3: return "grid-cols-3";
    case 4: return "grid-cols-4";
    case 5: return "grid-cols-5";
    case 6: return "grid-cols-6";
    case 7: return "grid-cols-7";
    default: return `grid-cols-${n}`;
  }
};

export default function DynamicTable<T extends { id: number }>({
  data,
  columns,
  onEdit,
  onDelete,
  renderActions,
}: DynamicTableProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  if (!data || data.length === 0) return <p>No data available</p>;

  return (
    <div className="overflow-x-auto">
      <div className={`grid ${getGridCols(columns.length + 1)} bg-gray-100 font-bold border border-black rounded-2xl mb-2`}>
        {columns.map((col) => (
          <div key={String(col.key)} className="p-2">
            {col.label ?? String(col.key)}
          </div>
        ))}
        <div className="p-2">Actions</div>
      </div>
    {data.map((item) => (
    <div key={item.id} className={`grid ${getGridCols(columns.length + 1)} mb-1 odd:bg-gray-100`}>
        <>
        {columns.map((col, idx) => {
            const value = item[col.key];
            const isFirst = idx === 0;
            const isLast = idx === columns.length - 1;

            return (
            <div
                key={String(col.key)}
                className={`p-2 border ${isFirst ? "rounded-tl-2xl rounded-bl-2xl" : ""} `}
            >
                {col.type === "image" && value ? (
                <div className="flex items-center justify-center p-1">
                    <Image
                    src={String(value)}
                    alt={String(value)}
                    width={64}
                    height={64}
                    className="w-16 h-10 object-cover rounded"
                    />
                </div>
                ) : (
                String(value ?? "")
                )}
            </div>
            );
        })}
        </>
        
        <div className="p-2 border rounded-tr-2xl rounded-br-2xl flex items-center justify-center gap-2">
        {onEdit && <FiEdit className="cursor-pointer" onClick={() => setSelectedItem(item)} />}
        {onDelete && <RiDeleteBin6Line className="text-red-500 h-5 w-5" onClick={() => onDelete(item.id)} />}
        {renderActions && renderActions(item)}
        </div>
    </div>
    ))}


      {selectedItem && onEdit && (
        <EditUserModal
          user={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSave={(updated) => {
            onEdit(updated);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
}











// import React, { useEffect, useState } from 'react';
// import DynamicTable from "@/common/DynamicTable";
// import { UserData } from "@/types/user";

// const columns = [
//   { key: "id", label: "ID" },
//   { key: "email", label: "Email" },
//   { key: "phone", label: "Phone" },
//   { key: "address", label: "Address" },
//   { key: "image", label: "Avatar", type: "image" },
//   { key: "hobby", label: "Hobby" },
// ];

// export default function AdvanceTable() {
//   const [usersData, setUsersData] = useState<UserData[]>([]);

//   useEffect(() => {
//     const existingData = sessionStorage.getItem("usersData");
//     const parsedData: UserData[] = existingData ? JSON.parse(existingData) : [];
//     setUsersData(parsedData);
//   }, []);

//   return (
//     <DynamicTable<UserData>
//       data={usersData}
//       columns={columns}
//       onEdit={(user) => {
//         // Update sessionStorage & state
//         const newData = usersData.map(u => u.id === user.id ? user : u);
//         sessionStorage.setItem("usersData", JSON.stringify(newData));
//         setUsersData(newData);
//       }}
//       onDelete={(id) => {
//         const newData = usersData.filter(u => u.id !== id);
//         sessionStorage.setItem("usersData", JSON.stringify(newData));
//         setUsersData(newData);
//       }}
//     />
//   );
// }
