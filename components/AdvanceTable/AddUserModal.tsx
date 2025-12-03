"use client";

import { UserData, UserError, DateRangeData, ImageType } from "@/types/user";
import { useState } from "react";
import UserRow from "./UserRow";
import { CiCirclePlus } from "react-icons/ci";
import { validateRow } from "@/utils/validateRow";

type Props = {
  existingRows: UserData[];
  onAddUsers: (users: UserData[]) => void;
};

export default function AddUserModal({ existingRows, onAddUsers }: Props) {
  const [showModal, setShowModal] = useState(false);

  const getNextId = (extraRows: UserData[] = []) => {
    const ids1 = existingRows.length ? existingRows.map((u) => u.id) : [0];
    const ids2 = extraRows.length ? extraRows.map((u) => u.id) : [0];

    return Math.max(...ids1, ...ids2) + 1;
  };

  const openModal = () => {
    const firstId = getNextId();
    setRows([{ id: firstId, email: "", phone: 0,address:"", city:"", state:"", country:"",dateRange:"", image: "", hobby: "" },]);
    setErrors([{ id: "", email: "", phone: "", city:"", state:"", country:"", image: "", hobby: "" },]);
    setShowModal(true);
  };

  const [rows, setRows] = useState<UserData[]>([]);
  const [errors, setErrors] = useState<UserError[]>([]);

  const handleChange = (
  index: number,
  field: keyof UserData,
  value: string | number | DateRangeData | ImageType
) => {
  const updatedRows = [...rows];

  if (field === "id" || field === "phone") {
    updatedRows[index][field] = Number(value) as UserData[typeof field];
  } else {
    updatedRows[index][field] = value as UserData[typeof field];
  }

  setRows(updatedRows);
};

  const addRow = () => {
    const nextId = getNextId(rows);
    setRows([...rows,{ id: nextId, email: "", phone: 0, address:"", city:"", state:"", country:"", image: "", hobby: "" },]);
    setErrors([...errors,{ id: "", email: "", phone: "", city:"", state:"", country:"", image: "", hobby: "" },]);};

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
    setErrors(errors.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const newErrors = rows.map((row) => validateRow(row, existingRows));
    setErrors(newErrors);

    const hasErrors = newErrors.some((e) =>
      Object.values(e).some((msg) => msg !== "")
    );

    if (hasErrors) return;
    onAddUsers(rows);
    setShowModal(false);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold mb-4">Advanced Users Table</h1>
        <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded text-sm">
          Add Data
        </button>
      </div>

      {showModal && (
        <div className="border border-gray-200 p-2 rounded-md my-2">
          <div className="p-4 rounded-lg w-full max-w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-base font-bold mb-4">Add Users</h2>

            {rows.map((row, index) => (
              <UserRow
                key={index}
                index={index}
                user={row}
                errors={errors[index]}
                onChange={handleChange}
                onRemove={removeRow}
              />
            ))}
          </div>

          <div className="flex gap-2 mb-2 ml-6">
            <button onClick={addRow} className="flex items-center gap-1 text-green-500 text-sm cursor-pointer">
              <CiCirclePlus /> Add Row
            </button>
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={() => setShowModal(false)} className="px-2 py-1 bg-gray-300 rounded text-sm">
              Cancel
            </button>

            <button onClick={handleSubmit} className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
