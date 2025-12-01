"use client";

import { useState } from "react";
import { EmployeeData } from "@/types/user";
import NestedEditModal from "./NestedEditModal";
import { FiEdit } from "react-icons/fi";

type Props = {
  employee: EmployeeData;
  onUpdate: (updated: EmployeeData) => void;
};

export default function NestedRow({ employee, onUpdate }: Props) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="flex items-center justify-between text-sm gap-4">
      <span>Salary: {employee.salary}</span>
      <span>City: {employee.city}</span>
      <span>Phone: {employee.phone}</span>
      <span>Hobby: {employee.hobby}</span>
      <span>DOB: {employee.dob}</span>
      <button className="text-blue-500 text-center font-5xl cursor-button" onClick={() => setEditOpen(true)}><FiEdit /></button>

      {editOpen && (
        <NestedEditModal
          employee={employee}
          onClose={() => setEditOpen(false)}
          onSave={onUpdate}
        />
      )}
    </div>
  );
}
