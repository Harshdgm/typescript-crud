import { UserData, UserError } from "@/types/user";
import { MAX_ID_DIGITS, MAX_PHONE_DIGITS, IMAGE_URL_REGEX } from "@/utils/constant";

export function validateRow(row: UserData): UserError {
  const errors: UserError = {
    id: "",
    email: "",
    phone: "",
    address: "",
    image: "",
    hobby: "",
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!row.id) {
    errors.id = "ID is required";
  } else if (row.id.toString().length > MAX_ID_DIGITS) {
    errors.id = `Max ${MAX_ID_DIGITS} digits allowed only`;
  }

  if (!row.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(row.email)) {
    errors.email = "Invalid email";
  }

  if (!row.phone) {
    errors.phone = "Phone is required";
  } else if (row.phone.toString().length !== MAX_PHONE_DIGITS) {
    errors.phone = `Phone must be ${MAX_PHONE_DIGITS} digits`;
  }

  if (!row.address) {
    errors.address = "Address is required";
  }

  if (!row.image) {
    errors.image = "Image URL is required";
  } else if (!IMAGE_URL_REGEX.test(row.image)) {
    errors.image = "Invalid image URL";
  }

  if (!row.hobby) {
    errors.hobby = "Hobby is required";
  } else if (/[0-9]/.test(row.hobby)) {
    errors.hobby = "Hobby cannot contain numbers";
  }

  return errors;
}
