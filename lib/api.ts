import axios from "axios";
import { User, UserData } from "@/types/user";
import data from "@/data/dataTable.json";

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await api.get<User[]>("/users");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return [];
  }
};

export const updateUser = async (
  id: number,
  payload: Partial<User>
): Promise<User> => {
  try {
    const res = await api.put<User>(`/users/${id}`, payload);
    return res.data;
  } catch (err) {
    console.error("Failed to update user:", err);
    throw err;
  }
};


export const fetchUserData = async (): Promise<UserData[]> => {
  try {
    return data.Users;
  } catch (err) {
    console.error("Failed to fetch table data:", err);
    return [];
  }
};
