import { format, parseJSON } from "date-fns";

export const formatDate = (date: string, pattern: string) => {
  try {
    const parsedDate = parseJSON(date);
    return format(parsedDate, pattern);
  } catch {
    return "";
  }
};
