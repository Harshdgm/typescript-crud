import { DateRangeData } from "@/types/user";

const getInitialDateRange = (): DateRangeData => {
  const now = new Date(); 
  const startUTC = new Date(
    Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    )
  );
  return { startDate: startUTC, endDate: startUTC, key: "selection" };
};

export default getInitialDateRange;
