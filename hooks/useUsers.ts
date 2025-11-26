"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { getUsers, updateUser, createUser } from "@/lib/api";

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

  const addUser = async (data: User) => {
  try {
    const newId = users.length ? users[users.length - 1].id + 1 : 1;

    const payload = { ...data, id: newId };

    const created = await createUser(payload);

    const finalUser = { ...created, id: newId }; 
    const updatedUsers = [...users, finalUser];

    setUsers(updatedUsers);
    sessionStorage.setItem("users", JSON.stringify(updatedUsers));
  } catch (err) {
    console.error("Failed to create user:", err);
  }
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
    try {
      const updatedUser = await updateUser(userId, newData);

      const updatedUsers = users.map((user) =>
        user.id === userId ? updatedUser : user
      );

      setUsers(updatedUsers);
      sessionStorage.setItem("users", JSON.stringify(updatedUsers));
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return {
    users,
    addUser,
    deleteUser,
    editUser,
    setUsers,
  };
}
