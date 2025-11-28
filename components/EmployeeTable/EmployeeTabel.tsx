"use client";

import { useState, useEffect } from "react";
import { EmployeeData } from "@/types/user";
import ReusableTable, { Column } from "@/common/ReusableTable";
import EditEmployeeModal from "./EditEmployeeModal";

const employeeColumns: Column<EmployeeData>[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  {
    key: "status",
    label: "Status",
    render: (item) => item.status, 
  },
  {
    key: "action",
    label: "Action Allowed",
    render: (item) => (item.action ? "Yes" : "No"),
  },
  { key: "actions", label: "Actions" },
];

export default function EmployeeTable({ data }: { data: EmployeeData[] }) {
  const [employees, setEmployees] = useState<EmployeeData[]>([]); 
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);

  useEffect(() => {
  if (typeof window !== "undefined") {
    const saved = sessionStorage.getItem("employeesData");
    setEmployees(saved ? JSON.parse(saved) : data);
  }
}, [data]);

useEffect(() => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("employeesData", JSON.stringify(employees));
  }
}, [employees]);

  const handleEdit = (employee: EmployeeData) => setSelectedEmployee(employee);

  const handleDelete = (employee: EmployeeData) => {
    const newEmployees = employees.filter((e) => e.id !== employee.id);
    setEmployees(newEmployees);
  };

  const handleSave = (updatedEmployee: EmployeeData) => {
    const newEmployees = employees.map((e) =>
      e.id === updatedEmployee.id ? { ...updatedEmployee } : e
    );
    setEmployees(newEmployees);
    setSelectedEmployee(null);
  };

  return (
    <div>
      <ReusableTable<EmployeeData>
        data={employees}
        columns={employeeColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {selectedEmployee && (
        <EditEmployeeModal
          user={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
