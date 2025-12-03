export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  isNew: boolean;
}

export type DateRangeData = {
  startDate: Date;
  endDate: Date;
  key?: string;
};

export type ImageType = `data:image/${string};base64,${string}` | string;

export type UserData = {
  id: number;
  email: string;
  phone: number;
  city: string;
  address: string;
  state: string;
  country: string;
  image: ImageType;
  hobby: string[];
  dateRange?: DateRangeData;
};

export type UserError = {
  id: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  image: ImageType;
  hobby: string;
  dateRange?: string;
};

export type EmployeeError = {
  id:string;
  name:string;
  email:string;
  age?:number;
  role:string;
  status: string; 
  action: string;

  salary?: number | string;
  city?: string;
  phone?: string;
  hobby?: string;
  dob?: string;
}

export type EmployeeData = {
  id: number;
  name: string;
  email: string;
  age?:number;
  role: string;
  status: "Active" | "Inactive";
  action: boolean;

  salary?: number | string;
  city?: string;
  phone?: string;
  hobby?: string;
  dob?: string;
};

