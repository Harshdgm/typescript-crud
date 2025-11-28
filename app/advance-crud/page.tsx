"use client";

import { useEffect } from "react";
import AdvanceTable from "@/components/AdvanceTable/AdvanceTable";
import AddUserModal from "@/components/AdvanceTable/AddUserModal";
import { useUsersStore, initUsersFromAPI, addUsers } from "@/utils/usersStore";
import { fetchUserData } from "@/lib/api";

export default function UsersAdvancedPage() {
  const usersData = useUsersStore();

  useEffect(() => {
    async function loadInitial() {
      const apiUsers = await fetchUserData();
      initUsersFromAPI(apiUsers); 
    }
    loadInitial();
  }, []);

  return (
    <div className="p-6">
      <AddUserModal existingRows={usersData} onAddUsers={addUsers} />
      <AdvanceTable data={usersData} />
    </div>
  );
}
