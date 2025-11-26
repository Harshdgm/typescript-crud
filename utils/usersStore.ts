"use client";

import { useSyncExternalStore } from "react";
import { UserData } from "@/types/user";

const STORAGE_KEY = "usersData";

// Helper: read from sessionStorage
function getSnapshot(): UserData[] {
  if (typeof window === "undefined") return [];
  const stored = sessionStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Helper: subscribe to storage changes (reactive)
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

// Hook: use this in any component
export function useUsersStore(): UserData[] {
  return useSyncExternalStore(subscribe, getSnapshot);
}

// Function to update the store
export function addUsers(newUsers: UserData[]) {
  const current = getSnapshot();
  const updated = [...current, ...newUsers];
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("storage"));
}

// Optional: clear all users
export function clearUsers() {
  sessionStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("storage"));
}
