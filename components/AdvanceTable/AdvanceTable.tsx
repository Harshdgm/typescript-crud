import { UserData } from "@/types/user";
import { deleteUserById } from "@/utils/usersStore";
import ReusableTable, { Column } from "@/common/ReusableTable";
import { toCamelCase } from "@/utils/toCamelCase";

const columns: Column[] = [
  { key: "id", label: "ID" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { 
    key: "address", 
    label: "Address", 
    render: (item: UserData) => toCamelCase(item.address ?? "") 
  },
  { key: "image", label: "Image", isImage: true },
  { 
    key: "hobby", 
    label: "Hobby", 
    render: (item: UserData) => toCamelCase(item.hobby ?? "") 
  },
  { key: "actions", label: "Actions" },
];

export default function AdvanceTable({ data }: { data: UserData[] }) {
  return (
    <ReusableTable
      data={data}
      columns={columns}
      onEdit={(user) => console.log("edit user:", user)}
      onDelete={(user) => deleteUserById(user.id)}
    />
  );
}
