"use client";

import { useState, useEffect } from "react";
import { EmployeeData } from "@/types/user";
import ReusableTable, { Column } from "@/common/ReusableTable";
import EditEmployeeModal from "./EditEmployeeModal";
import NestedRow from "./NestedRow";
import { calculateAge } from "@/utils/calculateAge";

const employeeColumns: Column<EmployeeData>[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "age", label:"Age" },
  { key: "role", label: "Role" },
  { key: "salary", label:"Salary" },
  { key: "status", label: "Status", render: item => item.status },
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
  const handleDelete = (employee: EmployeeData) => setEmployees(employees.filter(e => e.id !== employee.id));

  const handleSave = (updatedEmployee: EmployeeData) => {
    setEmployees(employees.map(e => e.id === updatedEmployee.id ? {...updatedEmployee} : e));
    setSelectedEmployee(null);
  };

  const handleNestedUpdate = (updatedEmployee: EmployeeData) => {
    const age = updatedEmployee.dob ? calculateAge(updatedEmployee.dob) : updatedEmployee.age;
    setEmployees(employees.map(e => e.id === updatedEmployee.id ? {...updatedEmployee, age} : e));
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1080px]">
        <ReusableTable<EmployeeData>
          data={employees}
          columns={employeeColumns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          expandableKey="name"
          renderNestedRow={employee => (
            <NestedRow employee={employee} onUpdate={handleNestedUpdate} />
          )}
        />
      </div>

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
