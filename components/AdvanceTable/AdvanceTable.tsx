"use client";

//import {use, useMemo} from "react";
import { UserData } from "@/types/user";
// import { fetchUserData } from "@/lib/api";
import Image from "next/image";

type Props = {
  data: UserData[];
};

export default function AdvanceTable({ data }: Props) {

    // const usersData: UserData[] = use(
    //   useMemo(() => fetchUserData(), [])
    // );

  return (
    <div>
        <h1 className="text-xl font-bold mb-4">Advanced Users Table</h1>
        <div className="overflow-x-auto text-center">
            <div className="grid grid-cols-6 bg-gray-100 font-bold border border-black rounded-2xl mb-2">
                <div className="p-2">ID</div>
                <div className="p-2">Email</div>
                <div className="p-2">Phone</div>
                <div className="p-2">Address</div>
                <div className="p-2">Image</div>
                <div className="p-2">Hobby</div>
            </div>
            {data.map((user)=>(
                <div key={user.id} className="grid grid-cols-6 mb-1">
                    <div className="p-2 border  rounded-tl-2xl rounded-bl-2xl">{user.id}</div>
                    <div className="p-2 border">{user.email}</div>
                    <div className="p-2 border">{user.phone}</div>
                    <div className="p-2 border">{user.address}</div>
                    <div className="p-2 border flex items-center justify-center">
                        <Image
                            src={user.image}
                            alt={user.email}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded"
                        />
                    </div>
                    <div className="p-2 border rounded-tr-2xl rounded-br-2xl">{user.hobby}</div>
                </div>
            ))}
        </div>
    </div>
  )
}
