"use client";

//import {use, useMemo} from "react";
import { UserData } from "@/types/user";
import { deleteUserById } from "@/utils/usersStore"; 
// import { fetchUserData } from "@/lib/api";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

type Props = {
  data: UserData[];
};

export default function AdvanceTable({ data }: Props) {

    // const usersData: UserData[] = use(
    //   useMemo(() => fetchUserData(), [])
    // );

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
                    <div className="p-2 border">{user.address}</div>
                    <div className="p-1 border flex items-center justify-center">
                        <Image
                            src={user.image}
                            alt={user.email}
                            width={64}
                            height={64}
                            className="w-16 h-10 object-cover rounded"
                        />
                    </div>
                    <div className="p-2 border">{user.hobby}</div>
                    <div className="p-2 border rounded-tr-2xl rounded-br-2xl flex items-center justify-center"><RiDeleteBin6Line className="text-red-500 h-5 w-5" onClick={() => deleteUserById(user.id)} /></div>
                </div>
            ))}
        </div>
    </div>
  )
}
