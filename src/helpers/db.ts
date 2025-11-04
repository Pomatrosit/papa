import type { DaysType } from "../types";

export const getInitialDays = () => {
  const days: DaysType = JSON.parse(localStorage.getItem("days") ?? "{}");

  return days;
};

export const saveDays = (days: DaysType) => {
  localStorage.setItem("days", JSON.stringify(days));
};
