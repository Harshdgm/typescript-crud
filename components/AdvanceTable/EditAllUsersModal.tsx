"use client";

import { useState } from "react";
import { UserData, UserError, DateRangeData } from "@/types/user";
import { validateRow } from "@/utils/validateRow";
import EditAllUserRow from "./EditAllUsersRow";

type Props = {
  users: UserData[];
  onClose: () => void;
  onSave: (updated: UserData[]) => void;
};

export default function EditAllUsersPanel({ users, onClose, onSave }: Props) {
  const [rows, setRows] = useState<UserData[]>(
    users.map((u) => ({
      ...u,
      dateRange: u.dateRange
        ? ({
            startDate: new Date(u.dateRange.startDate),
            endDate: new Date(u.dateRange.endDate),
            key: u.dateRange.key ?? "selection",
          } satisfies DateRangeData)
        : null,
    }))
  );

  const [errors, setErrors] = useState<Record<number, UserError>>({});

  const deleteRow = (index: number) => {
    const updated = rows
      .filter((_, i) => i !== index)
      .map((u, idx) => ({ ...u, id: idx + 1 }));

    setRows(updated);

    const newErrors: Record<number, UserError> = {};
    updated.forEach((_, idx) => {
      newErrors[idx] = errors[idx] ?? {};
    });

    setErrors(newErrors);
  };

  const updateField = <K extends keyof UserData>(
    index: number,
    key: K,
    value: UserData[K]
  ) => {
    setRows((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });

    setErrors((prev) => ({
      ...prev,
      [index]: { ...prev[index], [key]: "" },
    }));
  };

  const handleSave = () => {
    const validation: Record<number, UserError> = {};
    let hasError = false;

    rows.forEach((row, i) => {
      const e = validateRow(row);
      validation[i] = e;

      if (Object.values(e).some((v) => v)) hasError = true;
    });

    if (hasError) {
      setErrors(validation);
      return;
    }

    onSave(rows);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Edit All Users</h2>

        <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="space-y-10">
        {rows.map((row, index) => (
          <EditAllUserRow
            key={row.id}
            row={row}
            index={index}
            errors={errors[index] || {}}
            deleteRow={deleteRow}
            updateField={updateField}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button className="bg-gray-300 px-5 py-2 rounded-md" onClick={onClose}>
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-md"
          onClick={handleSave}
        >
          Save All
        </button>
      </div>
    </div>
  );
}
