"use client";

import { useState } from "react";
import Image from "next/image";
import { UserData, UserError, DateRangeData, ImageType } from "@/types/user";
import { validateRow } from "@/utils/validateRow";
import HobbySelector from "./HobbySelector";
import DateRangeInput from "./DateRangeInput";
import { cityData } from "@/utils/locationData";
import { fileToBase64 } from "@/utils/fileToBase64";

type Props = {
  users: UserData[];
  onClose: () => void;
  onSave: (updatedUsers: UserData[]) => void;
};

export default function EditAllUsersModal({ users, onClose, onSave }: Props) {
  const [rows, setRows] = useState<UserData[]>(
    users.map((u) => ({
      ...u,
      dateRange: u.dateRange
        ? {
            startDate: new Date(u.dateRange.startDate),
            endDate: new Date(u.dateRange.endDate),
            key: "selection",
          }
        : undefined,
    }))
  );

  const [errors, setErrors] = useState<Record<number, UserError>>({});

  const updateField = (index: number, key: keyof UserData, value: any) => {
    const copy = [...rows];
    copy[index][key] = value;

    setRows(copy);
    setErrors((prev) => ({
      ...prev,
      [index]: { ...prev[index], [key]: "" }
    }));
  };

  const handleSave = () => {
    const validationResult: Record<number, UserError> = {};
    let hasError = false;

    rows.forEach((row, i) => {
      const e = validateRow(row);
      validationResult[i] = e;
      if (Object.values(e).some((v) => v !== "")) hasError = true;
    });

    if (hasError) {
      setErrors(validationResult);
      return;
    }

    onSave(rows);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>

      <div className="bg-white z-10 rounded-lg shadow-lg w-full max-w-5xl overflow-y-auto max-h-[95vh] p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit All Users</h2>

        <div className="space-y-10">
          {rows.map((row, i) => (
            <div key={row.id} className="border p-4 rounded-xl">
              <h3 className="font-bold text-lg mb-3">User #{row.id}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                    type="text"
                    value={row.email}
                    onChange={(e) => updateField(i, "email", e.target.value)}
                    className="w-full border p-2 rounded-md"
                  />
                  {errors[i]?.email && <p className="text-red-500 text-sm">{errors[i].email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    value={row.phone}
                    onChange={(e) => updateField(i, "phone", Number(e.target.value))}
                    className="w-full border p-2 rounded-md"
                  />
                  {errors[i]?.phone && <p className="text-red-500 text-sm">{errors[i].phone}</p>}
                </div>

                {/* City Auto-fill */}
                <div>
                  <label className="block font-medium mb-1">City</label>
                  <input
                    type="text"
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
                  {errors[i]?.city && <p className="text-red-500 text-sm">{errors[i].city}</p>}
                </div>

                <div>
                  <label>State</label>
                  <input value={row.state} readOnly className="w-full border p-2 rounded-md bg-gray-100" />
                </div>

                <div>
                  <label>Country</label>
                  <input value={row.country} readOnly className="w-full border p-2 rounded-md bg-gray-100" />
                </div>

                <div className="md:col-span-2">
                  <DateRangeInput
                    value={row.dateRange!}
                    onChange={(range) => updateField(i, "dateRange", range)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label>Image</label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={async (e) => {
                      if (!e.target.files?.[0]) return;
                      const base64 = await fileToBase64(e.target.files[0]);
                      updateField(i, "image", base64 as ImageType);
                    }}
                    className="w-full border p-2 rounded-md"
                  />

                  {row.image && (
                    <div className="mt-2 w-28 h-28 relative border rounded-lg overflow-hidden">
                      <Image src={row.image} alt="" fill sizes="80px" className="object-cover" />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <HobbySelector
                    value={row.hobby || []}
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
          <button className="bg-blue-500 text-white px-5 py-2 rounded-md" onClick={handleSave}>
            Save All
          </button>
        </div>
      </div>
    </div>
  );
}
