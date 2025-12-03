"use client";

import { useSyncExternalStore } from "react";
import { EmployeeData } from "@/types/user";
import { STORAGE_KEYS } from "@/constant/storageKeys"; 

const STORAGE_KEY = STORAGE_KEYS.EMPLOYEES; 

let cache: EmployeeData[] = [];
const EMPTY: EmployeeData[] = [];

function getSnapshot(): EmployeeData[] {
  return cache;
}

function getServerSnapshot(): EmployeeData[] {
  return EMPTY;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = () => {
    const data = sessionStorage.getItem(STORAGE_KEY);
    cache = data ? JSON.parse(data) : [];
    callback();
  };

  window.addEventListener("storage", handleStorage);
  handleStorage();

  return () => window.removeEventListener("storage", handleStorage);
}

export function useUsersStore(): EmployeeData[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function addUsers(newUsers: EmployeeData[]) {
  cache = [...cache, ...newUsers];
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    window.dispatchEvent(new Event("storage"));
  }
}

export function initUsersFromAPI(apiUsers: EmployeeData[]) {
  if (cache.length === 0 && typeof window !== "undefined") {
    cache = apiUsers.map(emp => ({
      ...emp,
      status: emp.status === "Active" ? "Active" : "Inactive",
      action: !!emp.action,
    }));
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    window.dispatchEvent(new Event("storage"));
  }
}

export function deleteUserById(id: number) {
  cache = cache.filter(user => user.id !== id);
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    window.dispatchEvent(new Event("storage"));
  }
}
