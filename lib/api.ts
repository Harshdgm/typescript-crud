const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};

export const getUser = async (id: number) => {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  return res.json();
};

// export const createUser = async (data: any) => {
//   const res = await fetch(`${BASE_URL}/users`, {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" },
//   });
//   return res.json();
// };

// export const updateUser = async (id: number, data: any) => {
//   const res = await fetch(`${BASE_URL}/users/${id}`, {
//     method: "PUT",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" },
//   });
//   return res.json();
// };

export const deleteUser = async (id: number) => {
  await fetch(`${BASE_URL}/users/${id}`, { method: "DELETE" });
};
