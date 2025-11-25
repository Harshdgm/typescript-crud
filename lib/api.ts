import axios from "axios";
import { User } from "@/types/user";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get<User[]>(`${BASE_URL}/users`);
  return res.data; 
};

// export const getUser = async (id: number) => {
//   const res = await fetch(`${BASE_URL}/users/${id}`);
//   return res.json();
// };

// export const createUser = async (data: any) => {
//   const res = await fetch(`${BASE_URL}/users`, {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" },
//   });
//   return res.json();
// };

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  try {
    const res = await axios.put<User>(`${BASE_URL}/users/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data; 
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};