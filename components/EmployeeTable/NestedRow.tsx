"use client";

import { useState } from "react";
import { EmployeeData } from "@/types/user";
import NestedEditModal from "./NestedEditModal";
import { FiEdit } from "@/icons/index";

type Props = {
  employee: EmployeeData;
  onUpdate: (updated: EmployeeData) => void;
};

export default function NestedRow({ employee, onUpdate }: Props) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <div className="contents text-sm">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div>{employee.salary}</div>
        <div></div>
        <div>{employee.hobby}</div>
        <div>{employee.city}</div>
        <div>{employee.phone}</div>
        <div>{employee.dob}</div>
        <button
          className="text-blue-500 cursor-pointer flex justify-center"
          onClick={() => setEditOpen(true)}
        >
          <FiEdit />
        </button>
      </div>

      {editOpen && (
        <NestedEditModal
          employee={employee}
          onClose={() => setEditOpen(false)}
          onSave={onUpdate}
        />
      )}
    </>
  );
}
