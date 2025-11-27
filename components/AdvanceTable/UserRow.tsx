"use client";

import { FiMinusCircle } from "react-icons/fi";
import { UserData } from "@/types/user";
import { MAX_ID_DIGITS, MAX_PHONE_DIGITS } from "@/utils/constant";

type Props = {
    index: number;
    user: UserData;
    onChange: (index: number, field: keyof UserData, value: string | number) => void;
    onRemove: (index: number) => void;
}

export default function UserRow({ index, user, onChange, onRemove }: Props) {
  return (
    <div className="grid grid-cols-7 gap-2 mb-2 items-center">
      <input
        type="text"
        placeholder="ID"
        className="border p-2 rounded"
        value={user.id === 0 ? "" : user.id}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, "").slice(0, MAX_ID_DIGITS);
          onChange(index, "id", val ? Number(val) : 0);
        }}
      />

      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={user.email}
        onChange={(e) => onChange(index, "email", e.target.value)}
      />

      <input
        type="text"
        placeholder="Phone"
        className="border p-2 rounded"
        value={user.phone === 0 ? "" : user.phone}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, "").slice(0, MAX_PHONE_DIGITS);
          onChange(index, "phone", val ? Number(val) : 0);
        }}
      />

      <input
        type="text"
        placeholder="Address"
        className="border p-2 rounded"
        value={user.address}
        onChange={(e) => onChange(index, "address", e.target.value)}
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
        onChange={(e) => {
          const val = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          onChange(index, "hobby", val);
        }}
      />

      <button className="text-red-500 text-2xl" onClick={() => onRemove(index)}>
        <FiMinusCircle />
      </button>
    </div>
  );
}
