"use client";

import { useSyncExternalStore } from "react";
import { UserData } from "@/types/user";

const STORAGE_KEY = "usersData";

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
    const data = sessionStorage.getItem(STORAGE_KEY);
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
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  window.dispatchEvent(new Event("storage"));
}

export function initUsersFromAPI(apiUsers: UserData[]) {
  if (cache.length === 0) {
    cache = apiUsers;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    window.dispatchEvent(new Event("storage"));
  }
}

export function clearUsers() {
  cache = [];
  sessionStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("storage"));
}
