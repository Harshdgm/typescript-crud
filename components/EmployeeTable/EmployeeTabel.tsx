"use client";

import { useState } from "react";
import ReusableTable, { Column } from "@/common/ReusableTable";

export type EmployeeData = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<EmployeeData[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Inactive" },
  ]);

  // Define columns explicitly with Column<EmployeeData>
  const employeeColumns: Column<EmployeeData>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const handleDelete = (emp: EmployeeData) =>
    setEmployees((prev) => prev.filter((e) => e.id !== emp.id));

  const handleEdit = (emp: EmployeeData) => console.log("Edit employee:", emp);

  return (
    <div className="p-4">
      <ReusableTable<EmployeeData>
        data={employees}
        columns={employeeColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
