import axios from "axios";
import { User, UserData } from "@/types/user";


const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get<User[]>(`${BASE_URL}/users`);
  return res.data; 
};

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

export const fetchUserData = async():Promise<UserData[]>=>{
  try{
   const res = await axios.get("http://localhost:3000/dataTable.json");
   return res.data.Users;
  }catch(error){
    console.error("Failed to fetch data--------",error);
    return [];
  }
}