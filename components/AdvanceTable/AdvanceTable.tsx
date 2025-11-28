"use client";

import { UserData } from "@/types/user";
import { deleteUserById, useUsersStore } from "@/utils/usersStore"; 
import { toCamelCase } from "@/utils/toCamelCase";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import EditUserModal from "./EditUserModal";
import { useState } from "react";

type Props = {
  data: UserData[];
};

export default function AdvanceTable({ data }: Props) {

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const handleSave = (updatedUser: UserData) => {
  
    const existingData = sessionStorage.getItem("usersData");
    const cache: UserData[] = existingData ? JSON.parse(existingData) : [];

    const newCache = cache.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
    );

    sessionStorage.setItem("usersData", JSON.stringify(newCache));

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div>
        <div className="overflow-x-auto text-center">
            <div className="grid grid-cols-7 bg-gray-100 font-bold border border-black rounded-2xl mb-2">
                <div className="p-2">ID</div>
                <div className="p-2">Email</div>
                <div className="p-2">Phone</div>
                <div className="p-2">Address</div>
                <div className="p-2">Image</div>
                <div className="p-2">Hobby</div>
                <div className="p-2">Actions</div>
            </div>
            {data.map((user)=>(
                <div key={user.id} className="grid grid-cols-7 mb-1 odd:bg-gray-100">
                    <div className="p-2 border  rounded-tl-2xl rounded-bl-2xl">{user.id}</div>
                    <div className="p-2 border">{user.email}</div>
                    <div className="p-2 border">{user.phone}</div>
                    <div className="p-2 border">{toCamelCase(String(user.address ?? ""))}</div>
                    <div className="p-1 border flex items-center justify-center">
                        <Image
                            src={user.image}
                            alt={user.email}
                            width={64}
                            height={64}
                            className="w-16 h-10 object-cover rounded"
                        />
                    </div>
                    <div className="p-2 border">{toCamelCase(String(user.hobby ?? ""))}</div>
                    <div className="p-2 border rounded-tr-2xl rounded-br-2xl flex items-center justify-center gap-2">
                        <FiEdit  className="cursor-pointer" onClick={()=>setSelectedUser(user)}/>
                        <RiDeleteBin6Line className="text-red-500 h-5 w-5" onClick={() => deleteUserById(user.id)} />
                    </div>
                </div>
            ))}
        </div>
        {
            selectedUser && (
                <EditUserModal
                    user = {selectedUser}
                    onClose={()=>setSelectedUser(null)}
                  onSave={handleSave}
                />
            )
        }
    </div>
  )
}
