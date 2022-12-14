import {differenceInMinutes } from "date-fns";

const getTimePastIfLessThanDay = (compTime: Date | null): string => {
  if (!compTime) return "";

  const now = new Date();
  const then = new Date(compTime);
  const diffInMinutes = differenceInMinutes(now, then);
  if (diffInMinutes > 60) {
    if (diffInMinutes > 24 * 60) {
      return Math.round(diffInMinutes / (24 * 60)) +" days ago";
    }
    return Math.round(diffInMinutes / 60) + "h ago";
  }
  return Math.round(diffInMinutes) + "m ago";
};

export { getTimePastIfLessThanDay };