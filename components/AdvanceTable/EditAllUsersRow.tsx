"use client";

import Image from "next/image";
import { UserData, UserError, ImageType } from "@/types/user";
import { cityData } from "@/utils/locationData";
import { fileToBase64 } from "@/utils/fileToBase64";
import HobbySelector from "./HobbySelector";
import DateRangeInput from "./DateRangeInput";
import { RiDeleteBin6Line } from "react-icons/ri";

type RowProps = {
  row: UserData;
  index: number;
  errors: UserError;
  deleteRow: (index: number) => void;
  updateField: <K extends keyof UserData>(
    index: number,
    key: K,
    value: UserData[K]
  ) => void;
};

export default function EditAllUserRow({
  row,
  index,
  errors,
  deleteRow,
  updateField,
}: RowProps) {
  return (
    <div className="border p-4 rounded-xl relative">
      <button
        onClick={() => deleteRow(index)}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
        title="Delete User"
      >
        <RiDeleteBin6Line size={24} />
      </button>

      <h3 className="font-bold text-lg mb-3">User #{row.id}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div>
          <label>Email</label>
          <input
            value={row.email}
            onChange={(e) => updateField(index, "email", e.target.value)}
            className="w-full border p-2 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label>Phone</label>
          <input
            value={row.phone}
            onChange={(e) => updateField(index, "phone", Number(e.target.value))}
            className="w-full border p-2 rounded-md"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div>
          <label>City</label>
          <input
            value={row.city}
            onChange={(e) => {
              const input = e.target.value;
              if (/\d/.test(input)) return;

              const key = input.trim().toLowerCase().replace(/\s+/g, "");

              if (cityData[key]) {
                updateField(index, "city", input);
                updateField(index, "state", cityData[key].state);
                updateField(index, "country", cityData[key].country);
              } else {
                updateField(index, "city", input);
                updateField(index, "state", "");
                updateField(index, "country", "");
              }
            }}
            className="w-full border p-2 rounded-md"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        <div>
          <label>State</label>
          <input
            value={row.state}
            readOnly
            className="w-full border p-2 bg-gray-100 rounded-md"
          />
        </div>

        <div>
          <label>Country</label>
          <input
            value={row.country}
            readOnly
            className="w-full border p-2 bg-gray-100 rounded-md"
          />
        </div>

        {/* <div className="lg:col-span-2 md:col-span-2 sm:col-span-2 col-span-1">
          <label>Address</label>
          <input
            value={row.address}
            readOnly
           // onChange={(e) => updateField(index, "address", e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </div> */}

        <div className="col-span-full">
          {row.dateRange && (
            <DateRangeInput
              value={row.dateRange}
              onChange={(r) => updateField(index, "dateRange", r)}
            />
          )}
        </div>

        <div className="col-span-full">
          <label>Image</label>
          <input
            type="file"
            onChange={async (e) => {
              if (!e.target.files?.[0]) return;
              const base64 = await fileToBase64(e.target.files[0]);
              updateField(index, "image", base64 as ImageType);
            }}
            className="w-full border p-2 rounded-md"
          />

          {row.image && (
            <div className="mt-2 w-28 h-28 relative border rounded-lg overflow-hidden">
              <Image src={row.image} alt="" fill className="object-cover" />
            </div>
          )}
        </div>

        <div className="col-span-full">
          <HobbySelector
            value={row.hobby ?? []}
            onChange={(v) => updateField(index, "hobby", v)}
          />
        </div>
      </div>
    </div>
  );
}
