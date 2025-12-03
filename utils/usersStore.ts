"use client";

import { useSyncExternalStore } from "react";
import { UserData } from "@/types/user";
import { STORAGE_KEYS } from "@/constant/storageKeys";

let cache: UserData[] = [];
const EMPTY: UserData[] = [];

function getSnapshot(): UserData[] {
  return cache;
}

function getServerSnapshot(): UserData[] {
  return EMPTY;
}

function subscribe(callback: () => void) {
  function handleStorage() {
    const data = sessionStorage.getItem(STORAGE_KEYS.USERS);
    cache = data ? JSON.parse(data) : [];
    callback();
  }

  window.addEventListener("storage", handleStorage);
  handleStorage(); 

  return () => window.removeEventListener("storage", handleStorage);
}

export function useUsersStore(): UserData[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function addUsers(newUsers: UserData[]) {
  cache = [...cache, ...newUsers];
  sessionStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(cache));
  window.dispatchEvent(new Event("storage"));
}

export function initUsersFromAPI(apiUsers: UserData[]) {
  if (cache.length === 0) {
    cache = apiUsers;
    sessionStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(cache));
    window.dispatchEvent(new Event("storage"));
  }
}

// export function deleteUserById(id: number) {
//   cache = cache.filter((user) => user.id !== id);
//   sessionStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(cache));
//   window.dispatchEvent(new Event("storage"));
// }
