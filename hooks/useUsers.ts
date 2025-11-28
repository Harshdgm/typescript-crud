"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { getUsers, updateUser} from "@/lib/api";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = sessionStorage.getItem("users");

    if (storedUsers) {
      setTimeout(() => setUsers(JSON.parse(storedUsers)), 0);
    } else {
      const fetchUsers = async () => {
        const data: User[] = await getUsers();
        setUsers(data);
        sessionStorage.setItem("users", JSON.stringify(data));
      };
      fetchUsers();
    }
  }, []);

  const addUser = () => {
  const newId = users.length ? users[users.length - 1].id + 1 : 1;

  const newUser: User = {
    id: newId,
    name: "",
    username: "",
    email: "",
    isNew: true,
  };

  const updatedUsers = [...users, newUser];

  setUsers(updatedUsers);
    sessionStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const deleteUser = (userId: number) => {
    const deletedUser = users.find((user) => user.id === userId);
    if (!deletedUser) return;

    const deletedUsers = JSON.parse(sessionStorage.getItem("deletedUsers") || "[]");
    deletedUsers.push(deletedUser);
    sessionStorage.setItem("deletedUsers", JSON.stringify(deletedUsers));

    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    sessionStorage.setItem("users", JSON.stringify(updatedUsers));
  };

    const editUser = async (userId: number, newData: Partial<User>) => {
    const user = users.find((u) => u.id === userId);

    if (user?.isNew) {
      const updatedUser = { ...user, ...newData, isNew: false };
      const updatedUsers = users.map((u) =>
        u.id === userId ? updatedUser : u
      );

      setUsers(updatedUsers);
      sessionStorage.setItem("users", JSON.stringify(updatedUsers));
      return;
    }

    try {
      const updatedUser = await updateUser(userId, newData);
      const updatedUsers = users.map((u) =>
        u.id === userId ? updatedUser : u
      );

      setUsers(updatedUsers);
      sessionStorage.setItem("users", JSON.stringify(updatedUsers));
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return { users, addUser, deleteUser, editUser, setUsers};
}
