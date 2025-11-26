"use client";

import { useEffect } from "react";
import AdvanceTable from "@/components/AdvanceTable/AdvanceTable";
import AddUserModal from "@/components/AdvanceTable/AddUserModal";
import { useUsersStore, initUsersFromAPI, addUsers } from "@/utils/usersStore";
import { fetchUserData } from "@/lib/api";

export default function UsersAdvancedPage() {
  // Read from sessionStorage (reactive)
  const usersData = useUsersStore();

  // Load initial API users once
  useEffect(() => {
    async function loadInitial() {
      const apiUsers = await fetchUserData();
      initUsersFromAPI(apiUsers); // Adds API users into sessionStorage
    }
    loadInitial();
  }, []);

  return (
    <div className="p-6">
      <AddUserModal onAddUsers={addUsers} />
      <AdvanceTable data={usersData} />
    </div>
  );
}
