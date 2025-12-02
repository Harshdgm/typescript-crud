"use client";

import { FiMinusCircle } from "react-icons/fi";
import { UserData, UserError } from "@/types/user";
import { MAX_ID_DIGITS, MAX_PHONE_DIGITS } from "@/utils/constant";

type Props = {
  index: number;
  user: UserData;
  errors: UserError;
  onChange: (index: number, field: keyof UserData, value: string | number) => void;
  onRemove: (index: number) => void;
};

export default function UserRow({ index, user, errors, onChange, onRemove }: Props) {
  return (
    <div className="grid grid-cols-7 gap-2 items-start text-sm">
      <div>
        <input
          type="text"
          placeholder="ID"
          className="border p-1 rounded w-full"
          value={user.id === 0 ? "" : user.id}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, MAX_ID_DIGITS);
            onChange(index, "id", val ? Number(val) : 0);
          }}
        />
        {errors.id && <p className="text-red-500 text-sm">{errors.id}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          className="border p-1 rounded w-full"
          value={user.email}
          onChange={(e) => onChange(index, "email", e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Phone"
          className="border p-1 rounded w-full"
          value={user.phone === 0 ? "" : user.phone}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, MAX_PHONE_DIGITS);
            onChange(index, "phone", val ? Number(val) : 0);
          }}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Address"
          className="border p-1 rounded w-full"
          value={user.address}
          onChange={(e) => onChange(index, "address", e.target.value)}
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Image URL"
          className="border p-1 rounded w-full"
          value={user.image}
          onChange={(e) => onChange(index, "image", e.target.value)}
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Hobby"
          className="border p-1 rounded w-full"
          value={user.hobby}
          onChange={(e) => {
            const val = e.target.value.replace(/[^a-zA-Z\s]/g, "");
            onChange(index, "hobby", val);
          }}
        />
        {errors.hobby && <p className="text-red-500 text-sm">{errors.hobby}</p>}
      </div>

      <button className="text-red-500 text-xl " onClick={() => onRemove(index)}>
        <FiMinusCircle />
      </button>
    </div>
  );
}
