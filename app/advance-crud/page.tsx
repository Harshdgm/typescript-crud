'use client';

import AdvanceTable from "@/components/AdvanceTable/AdvanceTable";
import AddUserModal from "@/components/AdvanceTable/AddUserModal";
import { fetchUserData } from "@/lib/api";
import { UserData } from "@/types/user";
import { use, useMemo, useState } from "react";

export default function UsersAdvancedPage() {
  const initialUsers: UserData[] = use(
    useMemo(() => fetchUserData(), [])
  );

  const [usersData, setUsersData] = useState<UserData[]>(initialUsers);

  const handleAddUsers = (newUsers: UserData[]) => {
    setUsersData([...usersData, ...newUsers]);
  };

  return (
    <div className="p-6">
      <AddUserModal onAddUsers={handleAddUsers} />
      <AdvanceTable data={usersData} />
    </div>
  );
}
