"use client";

import { FiMinusCircle } from "react-icons/fi";
import { UserData, UserError } from "@/types/user";
import { MAX_PHONE_DIGITS } from "@/utils/constant";
import { cityData } from "@/utils/locationData";
import DateRangeInput from "./DateRangeInput";
import { fileToBase64 } from "@/utils/fileToBase64";
import HobbySelector from "./HobbySelector";
import { useState } from "react";

type Props = {
  index: number;
  user: UserData;
  errors: UserError;
  onChange: (
    index: number,
    field: keyof UserData,
    value: string | number | UserData["dateRange"]
  ) => void;
  onRemove: (index: number) => void;
};

export default function UserRow({ index, user, errors, onChange, onRemove }: Props) {
  const [editValues, setEditValues] = useState<UserData>({ ...user });

  return (
    <div className="grid grid-cols-7 gap-2 items-start text-sm mb-2">
      <div>
        <input
          type="text"
          className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
          value={user.id}
          readOnly
        />
        {errors.id && <p className="text-red-500 text-sm">{errors.id}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full"
          value={user.email}
          onChange={(e) => onChange(index, "email", e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Phone"
          className="border p-2 rounded w-full"
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
          placeholder="City"
          className="border p-2 rounded w-full"
          value={user.city}
          onChange={(e) => {
            const input = e.target.value;
            const cityKey = input.trim().toLowerCase().replace(/\s+/g, "");

            if (cityData[cityKey]) {
              onChange(index, "city", input);
              onChange(index, "state", cityData[cityKey].state);
              onChange(index, "country", cityData[cityKey].country);
            } else {
              onChange(index, "city", input);
              onChange(index, "state", "");
              onChange(index, "country", "");
            }
          }}
        />
        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="State"
          className="border p-2 rounded w-full bg-gray-100"
          value={user.state}
          readOnly
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Country"
          className="border p-2 rounded w-full bg-gray-100"
          value={user.country}
          readOnly
        />
      </div>

      <div className="col-span-2">
        <DateRangeInput
          value={
            user.dateRange || {
              startDate: new Date(),
              endDate: new Date(),
              key: "selection",
            }
          }
          onChange={(range) => onChange(index, "dateRange", range)}
        />
        {errors.dateRange && <p className="text-red-500 text-sm">{errors.dateRange}</p>}
      </div>

      <div>
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="border p-2 rounded w-full"
          onChange={async (e) => {
            if (e.target.files && e.target.files[0]) {
              const base64 = await fileToBase64(e.target.files[0]);
              onChange(index, "image", base64);
            }
          }}
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
      </div>

      <div>
        <HobbySelector
            value={editValues.hobby || []}  
            onChange={(val) => {
              setEditValues((prev) => ({ ...prev, hobby: val }));
              onChange(index, "hobby", val);
            }}
          />
          {errors.hobby && <p className="text-red-500 text-sm">{errors.hobby}</p>}
      </div>

      <button className="text-red-500 text-xl" onClick={() => onRemove(index)}>
        <FiMinusCircle />
      </button>
    </div>
  );
}
