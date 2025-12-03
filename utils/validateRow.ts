
import { UserData, UserError,DateRangeData, ImageType } from "@/types/user";
import { MAX_ID_DIGITS, MAX_PHONE_DIGITS, IMAGE_URL_REGEX } from "@/utils/constant";

export function validateRow(row: UserData,existingRows: UserData[]=[]): UserError {
  const errors: UserError = {
    id: "",
    email: "",
    phone: "",  
    city:"",
    state:"",
    country:"",
    image: "",
    hobby: "",
    dateRange:"",
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!row.id) {
    errors.id = "ID is required";
  } else if (row.id.toString().length > MAX_ID_DIGITS) {
    errors.id = `Max ${MAX_ID_DIGITS} digits allowed only`;
  }else if (existingRows.some(u => u.id === row.id)) {
    errors.id = "ID already exists"; 
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

  // if (!row.address) {
  //   errors.address = "Address is required";
  // }

  if (!row.city) errors.city = "City is required";
  if (!row.state) errors.state = "State is required";
  if (!row.country) errors.country = "Country is required";

  if (row.image) {
    const isBase64 = row.image.startsWith("data:image/");
    const isUrl = IMAGE_URL_REGEX.test(row.image);

    if (!isBase64 && !isUrl) {
      errors.image = "Invalid image format";
    }
  }

  if (!row.hobby || row.hobby.length === 0) {
    errors.hobby = "At least one hobby is required";
  } else if (row.hobby.some(h => /[0-9]/.test(h))) {
    errors.hobby = "Hobbies cannot contain numbers";
  }


  if (!row.dateRange) {
    errors.dateRange = "Date range is required";
  } else if (!row.dateRange.startDate || !row.dateRange.endDate) {
    errors.dateRange = "Both start & end dates are required";
  } else if (row.dateRange.startDate > row.dateRange.endDate) {
    errors.dateRange = "Start date cannot be after end date";
  }

  return errors;
}
