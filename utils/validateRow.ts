import { UserData } from "@/types/user";
import { MAX_ID_DIGITS, MAX_PHONE_DIGITS, IMAGE_URL_REGEX } from "@/utils/constant";

export function validateRow(row: UserData, index: number): string | null {
  if (row.id === null || row.id === undefined || typeof row.id !== "number") {
    return `Row ${index + 1}: ID must be a number`;
  }

  if (row.id.toString().length > MAX_ID_DIGITS) {
    return `Row ${index + 1}: ID cannot exceed ${MAX_ID_DIGITS} digits`;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!row.email || !emailRegex.test(row.email)) {
    return `Row ${index + 1}: Invalid email`;
  }

  if (!row.phone || typeof row.phone !== "number") {
    return `Row ${index + 1}: Phone must be a number`;
  }

  if (row.phone.toString().length !== MAX_PHONE_DIGITS) {
    return `Row ${index + 1}: Phone must be exactly ${MAX_PHONE_DIGITS} digits`;
  }

  if (!row.address || typeof row.address !== "string") {
    return `Row ${index + 1}: Address must be a string`;
  }

  if (!row.image || typeof row.image !== "string" || !IMAGE_URL_REGEX.test(row.image)) {
    return `Row ${index + 1}: Image URL must be a valid image URL`;
  }

  if (!row.hobby || typeof row.hobby !== "string" || /[0-9]/.test(row.hobby)) {
    return `Row ${index + 1}: Hobby must be a string without numbers`;
  }

  return null;
}
