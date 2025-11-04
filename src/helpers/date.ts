import { Dayjs } from "dayjs";
import "dayjs/locale/ru";

export const formatDate = (date: Dayjs | null): string => {
  if (!date) return "";

  return date.locale("ru").format("D MMMM YYYY");
};

export const dateKey = (date: Dayjs | null) => {
  if (!date) return "";

  return date.format("DD-MM-YY");
};
