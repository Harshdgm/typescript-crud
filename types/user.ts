export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  isNew: boolean;
}

export type UserData = {
  id: string;
  email: string;
  phone: number;
  address: string;
  image: string;
  hobby: string;
};