"use client";

import { useState } from "react";
import Image from "next/image";
import {
  UserData,
  UserError,
  ImageType,
  DateRangeData,
} from "@/types/user";
import { validateRow } from "@/utils/validateRow";
import HobbySelector from "./HobbySelector";
import DateRangeInput from "./DateRangeInput";
import { cityData } from "@/utils/locationData";
import { fileToBase64 } from "@/utils/fileToBase64";
import { RiDeleteBin6Line } from "react-icons/ri";

type Props = {
  users: UserData[];
  onClose: () => void;
  onSave: (updated: UserData[]) => void;
};

export default function EditAllUsersPanel({
  users,
  onClose,
  onSave,
}: Props) {
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
    const newRows = rows
      .filter((_, i) => i !== index)
      .map((u, idx) => ({ ...u, id: idx + 1 })); 

    setRows(newRows);

    const newErrors: Record<number, UserError> = {};
    newRows.forEach((_, idx) => {
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
        {rows.map((row, i) => (
          <div key={row.id} className="border p-4 rounded-xl relative">
            <button
              onClick={() => deleteRow(i)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              title="Delete User"
            >
              <RiDeleteBin6Line size={24} />
            </button>

            <h3 className="font-bold text-lg mb-3">User #{row.id}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label>Email</label>
                <input
                  value={row.email}
                  onChange={(e) => updateField(i, "email", e.target.value)}
                  className="w-full border p-2 rounded-md"
                />
                {errors[i]?.email && (
                  <p className="text-red-500 text-sm">{errors[i].email}</p>
                )}
              </div>

              <div>
                <label>Phone</label>
                <input
                  value={row.phone}
                  onChange={(e) =>
                    updateField(i, "phone", Number(e.target.value))
                  }
                  className="w-full border p-2 rounded-md"
                />
                {errors[i]?.phone && (
                  <p className="text-red-500 text-sm">{errors[i].phone}</p>
                )}
              </div>

              <div>
                <label>City</label>
                <input
                  value={row.city}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/\d/.test(input)) return;

                    const key = input.trim().toLowerCase().replace(/\s+/g, "");
                    if (cityData[key]) {
                      updateField(i, "city", input);
                      updateField(i, "state", cityData[key].state);
                      updateField(i, "country", cityData[key].country);
                    } else {
                      updateField(i, "city", input);
                      updateField(i, "state", "");
                      updateField(i, "country", "");
                    }
                  }}
                  className="w-full border p-2 rounded-md"
                />
                {errors[i]?.city && (
                  <p className="text-red-500 text-sm">{errors[i].city}</p>
                )}
              </div>

              <div>
                <label>State</label>
                <input
                  value={row.state}
                  readOnly
                  className="w-full border p-2 bg-gray-100 rounded-md"
                />
              </div>

              <div>
                <label>Country</label>
                <input
                  value={row.country}
                  readOnly
                  className="w-full border p-2 bg-gray-100 rounded-md"
                />
              </div>

              <div className="md:col-span-2">
                {row.dateRange && (
                  <DateRangeInput
                    value={row.dateRange}
                    onChange={(r) => updateField(i, "dateRange", r)}
                  />
                )}
              </div>

              <div className="md:col-span-2">
                <label>Image</label>
                <input
                  type="file"
                  onChange={async (e) => {
                    if (!e.target.files?.[0]) return;
                    const base64 = await fileToBase64(e.target.files[0]);
                    updateField(i, "image", base64 as ImageType);
                  }}
                  className="w-full border p-2 rounded-md"
                />

                {row.image && (
                  <div className="mt-2 w-28 h-28 relative border rounded-lg overflow-hidden">
                    <Image
                      src={row.image}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <HobbySelector
                  value={row.hobby ?? []}
                  onChange={(v) => updateField(i, "hobby", v)}
                />
              </div>
            </div>
          </div>
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
