'use client';

interface TableActionsProps {
  userId: number;
  deleteUser: (userId: number) => void;
}

export default function TableActions({ userId, deleteUser }: TableActionsProps) {
  return (
    <div className="flex gap-2">
      <button className="text-blue-500 cursor-pointer">Edit</button>
      <button className="text-red-500 cursor-pointer" onClick={() => deleteUser(userId)}>
        Delete
      </button>
    </div>
  );
}
