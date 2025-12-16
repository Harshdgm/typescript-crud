"use client";

import { useState, useEffect, useMemo } from "react";
import { EmployeeData } from "@/types/user";
import ReusableTable, { Column } from "@/common/ReusableTable";
import EditEmployeeModal from "./EditEmployeeModal";
import NestedRow from "./NestedRow";
import { calculateAge } from "@/utils/calculateAge";
import { useLabels } from "@/hooks/useLabels";

export default function EmployeeTable({ data }: { data: EmployeeData[] }) {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);

  const labels = useLabels();

  const employeeColumns: Column<EmployeeData>[] = useMemo(
    () => [
      { key: "id", label: labels.id },
      { key: "name", label: labels.name },
      { key: "email", label: labels.email },
      { key: "age", label: labels.age },
      { key: "role", label: labels.role },
      { key: "salary", label: labels.salary },
      { key: "status", label: labels.status, render: item => item.status },
      { key: "hobby", label: labels.hobby, render: () => "" },
      { key: "city", label: labels.city, render: () => "" },
      { key: "phone", label: labels.phone, render: () => "" },
      { key: "dob", label: labels.dob, render: () => "" },
      { key: "actions", label: labels.actions },
    ],
    [labels]
  );

  useEffect(() => {
    const saved = sessionStorage.getItem("employeesData");
    setEmployees(saved ? JSON.parse(saved) : data);
  }, [data]);

  useEffect(() => {
    sessionStorage.setItem("employeesData", JSON.stringify(employees));
  }, [employees]);

  const handleEdit = (employee: EmployeeData) => setSelectedEmployee(employee);
  const handleDelete = (employee: EmployeeData) =>
    setEmployees(employees.filter(e => e.id !== employee.id));

  const handleSave = (updatedEmployee: EmployeeData) => {
    setEmployees(
      employees.map(e => (e.id === updatedEmployee.id ? updatedEmployee : e))
    );
    setSelectedEmployee(null);
  };

  const handleNestedUpdate = (updatedEmployee: EmployeeData) => {
    const age = updatedEmployee.dob
      ? calculateAge(updatedEmployee.dob)
      : updatedEmployee.age;

    setEmployees(
      employees.map(e =>
        e.id === updatedEmployee.id ? { ...updatedEmployee, age } : e
      )
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1400px]">
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
