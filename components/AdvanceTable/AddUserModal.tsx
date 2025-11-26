"use client";

import { UserData } from "@/types/user";
import { useState } from "react";
import UserRow from "./UserRow";
import { FiPlus } from "react-icons/fi";
import { validateRow } from "@/utils/validateRow";

type Props = {
    onAddUsers: (users:UserData[]) => void;
}

export default function AddUserModal({onAddUsers}:Props) {
    const [showModal,setShowModal] = useState(false);
    const [rows,setRows] = useState<UserData[]>([
        {id:0,email:"",phone:0,address:"",image:"",hobby:""},
    ])

    const handleChange=(index:number,field:keyof UserData,value:string | number)=>{
        const newRows = [...rows];
        if (field === "id" || field === "phone") {
            newRows[index][field] = Number(value);
        } else {
            newRows[index][field] = String(value);
        }
        setRows(newRows);
    }

    const addRow = () => {
        setRows([...rows,{id:0,email:"",phone:0,address:"",image:"",hobby:""}]);
    }

    const removeRow = (index:number)=>{
        setRows(rows.filter((_, i)=> i !== index));
    }

    const handleSubmit = ()=>{
        for(let i=0;i<rows.length;i++){
            const error = validateRow(rows[i],i);
            if(error){
                alert(error);
                return;
            }
        }

        onAddUsers(rows);
        setRows([{id:0,email:"",phone:0,address:"",image:"",hobby:""}])
        setShowModal(false);
    }

  return (
    <div className="mb-4">
        <button onClick={()=>setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Add Data</button>


    {showModal && (
        <div className="">
            <div className="p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Add Users</h2>

                {rows.map((row,index)=>(
                    <UserRow
                     key={index} 
                     index={index}
                     user={row}
                     onChange={handleChange} 
                     onRemove={removeRow}
                    />
                ))}
            </div>
            <div className="flex gap-2 mb-4">
                <button onClick={addRow} className="flex items-center gap-1 text-green-500">
                    <FiPlus />Add Row
                </button>
            </div>
            <div className="flex justify-end gap-2">
                <button onClick={()=>setShowModal(false)} className="px-2 py-2 bg-gray-300 rounded">Cancel</button>
                <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded">
                Submit
              </button>
            </div>
        </div>
    )}
    </div>
  )
}
