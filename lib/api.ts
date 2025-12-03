import axios from "axios";
import { EmployeeData, User, UserData } from "@/types/user";
import data from "@/data/dataTable.json";
import data1 from "@/data/employeeTable.json";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    return (data.Users || []).map(u => ({
      ...u,
      hobby: u.hobby || [],
      dateRange: u.dateRange
        ? {
            startDate: new Date(u.dateRange.startDate),
            endDate: new Date(u.dateRange.endDate),
            key: u.dateRange.key,
          }
        : undefined,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchEmployeeData = async (): Promise<EmployeeData[]> => {
  try {
    return (data1.Employees || []).map(emp => ({
      id: emp.id,
      name: emp.name,
      email: emp.email,
      age: emp.age,
      role: emp.role,
      status: emp.status === "Active" ? "Active" : "Inactive",
      action: emp.action ?? false,
      salary: emp.salary,
      city: emp.city,
      phone: emp.phone,
      hobby: Array.isArray(emp.hobby) ? emp.hobby : [emp.hobby], 
      dob: emp.dob,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}
