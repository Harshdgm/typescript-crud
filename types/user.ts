export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  isNew: boolean;
}

export type UserData = {
  id: number;
  email: string;
  phone: number;
  address: string;
  image: string;
  hobby: string;
};

export type UserError = {
  id: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  hobby: string;
};
