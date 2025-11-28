"use client";

import { useEffect } from "react";
import EmployeeTable from "@/components/EmployeeTable/EmployeeTabel"; 
import { useUsersStore, initUsersFromAPI } from "@/utils/employeeStore";
import { fetchEmployeeData } from "@/lib/api";

export default function UsersEmployeePage() {
  const usersData = useUsersStore();

  useEffect(() => {
    async function loadInitial() {
      const apiUsers = await fetchEmployeeData();
      initUsersFromAPI(apiUsers); 
    }
    loadInitial();
  }, []);

  return (
    <div className="p-6">
     <EmployeeTable data={usersData} />
    </div>
  );
}
