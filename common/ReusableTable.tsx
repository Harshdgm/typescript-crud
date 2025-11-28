"use client";

import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export type Column<T> = {
  key: keyof T | "actions";
  label: string;
  isImage?: boolean;
  render?: (item: T) => React.ReactNode;
};

interface ReusableTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export default function ReusableTable<T extends { id: number }>({
  data,
  columns,
  onEdit,
  onDelete,
}: ReusableTableProps<T>) {
  return (
    <div className="overflow-x-auto text-center">
      <div className={`grid grid-cols-${columns.length} mb-2`}>
        {columns.map((col, idx) => {
          let classes = "p-2 font-bold bg-gray-100 border border-black";
          if (idx === 0) classes += " rounded-tl-2xl rounded-bl-2xl";
          if (idx === columns.length - 1) classes += " rounded-tr-2xl rounded-br-2xl";
          return <div key={String(col.key)} className={classes}>{col.label}</div>;
        })}
      </div>

      {data.map((item, rowIndex) => (
        <div
          key={item.id}
          className={`mb-1 rounded-2xl overflow-hidden ${rowIndex % 2 === 0 ? "" : "bg-gray-100"}`}
        >
          <div className={`grid grid-cols-${columns.length}`}>
            {columns.map((col, colIndex) => {
              let cellClasses = "p-2 border";
              if (colIndex === 0) cellClasses += " rounded-tl-2xl rounded-bl-2xl";
              if (colIndex === columns.length - 1) cellClasses += " rounded-tr-2xl rounded-br-2xl";

              if (col.key === "actions") {
                return (
                  <div key="actions" className={`${cellClasses} flex items-center justify-center gap-2`}>
                    {onEdit && <FiEdit className="cursor-pointer" onClick={() => onEdit(item)} />}
                    {onDelete && <RiDeleteBin6Line className="text-red-500 h-5 w-5" onClick={() => onDelete(item)} />}
                  </div>
                );
              }

              const value = item[col.key as keyof T];

              if (col.render) return <div key={String(col.key)} className={cellClasses}>{col.render(item)}</div>;
              if (col.isImage && typeof value === "string") {
                return (
                  <div key={String(col.key)} className={`${cellClasses} flex items-center justify-center p-1`}>
                    <Image src={value} alt="" width={64} height={64} className="w-16 h-10 object-cover rounded" />
                  </div>
                );
              }

              return <div key={String(col.key)} className={cellClasses}>{String(value ?? "")}</div>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
