"use client";

import {FiMinus} from "react-icons/fi";
import { UserData } from "@/types/user";

type Props = {
    index:number,
    user:UserData,
    onChange:(index:number, field:keyof UserData, value: string | number) => void;
    onRemove:(index:number)=>void; 
}

export default function UserRow({index, user, onChange, onRemove }: Props) {
  return (
    <div className="grid grid-cols-6 gap-2 mb-2 items-center">
        <input 
            type="text"
            placeholder="ID"
            className="border p-2 rounded"
            value={user.id}
            onChange={(e)=>onChange(index,"id",e.target.value)}
        />
        <input
            type="email"
            placeholder="Email"
            className="border p-2 rouded"
            value={user.email}
            onChange={(e)=>onChange(index,"email",e.target.value)}
        />
        <input 
            type="number"
            placeholder="Phone"
            className="border p-2 rounded"
            value={user.phone}
            onChange={(e)=>onChange(index,"phone",e.target.value)}
        />
        <input 
            type="text"
            placeholder="Address"
            className="border p-2 rounded"
            value={user.address}
            onChange={(e)=>onChange(index,"address",e.target.value)}
        />
        <input
            type="text"
            placeholder="Image URL"
            className="border p-2 rounded"
            value={user.image}
            onChange={(e) => onChange(index, "image", e.target.value)}
        />
        <input
            type="text"
            placeholder="Hobby"
            className="border p-2 rounded"
            value={user.hobby}
            onChange={(e) => onChange(index, "hobby", e.target.value)}
        />
            <button className="text-red-500 text-xl" onClick={()=>onRemove(index)}><FiMinus /></button>
    </div>
  )
}
