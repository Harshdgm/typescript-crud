import { UserData } from "@/types/user";

export function validateRow(row:UserData,index:number):string | null{
    if(row.id === null || row.id === undefined || typeof row.id !== "number"){
        return `Row ${index + 1}: ID must be a number`;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!row.email || !emailRegex.test(row.email)){
        return `Row ${index +1}: Invalid email`;
    }

    if(!row.phone || typeof row.phone !== "number" || row.phone.toString().length !== 10){
        return `Row ${index + 1}: Phone must be a 10-digit number`;
    }

    if (!row.address || typeof row.address !== "string") {
        return `Row ${index + 1}: Address must be a string`;
    }

    if (!row.image || typeof row.image !== "string") {
        return `Row ${index + 1}: Image URL is required`;
    }

     if (!row.hobby || typeof row.hobby !== "string") {
        return `Row ${index + 1}: Hobby must be a string`;
    }

    return null;
}