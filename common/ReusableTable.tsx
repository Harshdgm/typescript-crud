"use client";

import Image from "next/image";
import { useState } from "react";
import { FiEdit, FiChevronDown, FiChevronUp, RiDeleteBin6Line } from "@/icons/index";

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
  expandableKey?: keyof T; 
  renderNestedRow?: (item: T) => React.ReactNode;
}

export default function ReusableTable<T extends { id: number }>({
  data,
  columns,
  onEdit,
  onDelete,
  expandableKey,
  renderNestedRow,
}: ReusableTableProps<T>) {

  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  return (
    <div className="overflow-x-auto text-center">
      <div className="grid mb-2" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
        {columns.map((col, idx) => {
          let classes = "p-2 font-bold bg-gray-100 border border-black text-sm";

          if (idx === 0) classes += " rounded-tl-2xl rounded-bl-2xl";
          if (idx === columns.length - 1) classes += " rounded-tr-2xl rounded-br-2xl";

          return <div key={String(col.key)} className={classes}>{col.label}</div>;
        })}
      </div>

      {data.map((item, rowIndex) => (
        <div key={item.id} className={`mb-1 rounded-2xl overflow-hidden text-sm ${rowIndex % 2 === 0 ? "" : "bg-gray-100"}`}>
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
            }}
          >
            {columns.map((col, colIndex) => {
              let cellClasses = "p-2 border max-w-[200px] overflow-x-auto whitespace-nowrap no-scrollbar";
              if (colIndex === 0)
                cellClasses += " rounded-tl-2xl rounded-bl-2xl";
              if (colIndex === columns.length - 1)
                cellClasses += " rounded-tr-2xl rounded-br-2xl";

              if (col.key === "actions") {
                return (
                  <div
                    key="actions"
                    className={`${cellClasses} flex items-center justify-center gap-2`}
                  >
                    {onEdit && (
                      <FiEdit
                        className="cursor-pointer"
                        onClick={() => onEdit(item)}
                      />
                    )}
                    {onDelete && (
                      <RiDeleteBin6Line
                        className="text-red-500 h-5 w-5 cursor-pointer"
                        onClick={() => onDelete(item)}
                      />
                    )}
                  </div>
                );
              }

              const value = item[col.key as keyof T];
               if (expandableKey === col.key) {
                return (
                  <div
                    key={String(col.key)}
                    className={`${cellClasses} cursor-pointer flex items-center justify-center gap-1 `}
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  >
                    <span>{String(value)}</span>
                    {expandedId === item.id ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                );
              }

              if (col.render)
                return (
                  <div key={String(col.key)} className={cellClasses}>
                    {col.render(item)}
                  </div>
                );

              if (col.isImage && typeof value === "string") {
                return (
                  <div
                    key={String(col.key)}
                    className={`${cellClasses} flex items-center justify-center p-1`}
                  >
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

              return (
                <div key={String(col.key)} className={cellClasses}>
                  {String(value ?? "")}
                </div>
              );
            })}
          </div>
          {expandedId === item.id && renderNestedRow && (
            <div className="m-1 p-3 border rounded-2xl grid" style={{gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`}}>
              {renderNestedRow(item)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
