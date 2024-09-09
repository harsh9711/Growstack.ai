import { differenceInDays, differenceInMonths, differenceInYears, format } from "date-fns";

export const formatRelativeDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();

  const daysDifference = differenceInDays(today, date);
  const monthsDifference = differenceInMonths(today, date);
  const yearsDifference = differenceInYears(today, date);

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference === 1) {
    return "Yesterday";
  } else if (daysDifference < 30) {
    return `${daysDifference} days ago`;
  } else if (monthsDifference === 1) {
    return "1 month ago";
  } else if (monthsDifference < 12) {
    return `${monthsDifference} months ago`;
  } else if (yearsDifference === 1) {
    return "1 year ago";
  } else {
    return "A long time ago";
  }
};

export function timeDiffFromNow(inputDate: string): string {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(inputDate).getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diffInMs < hour) {
      return `${Math.floor(diffInMs / minute)}m`;
  } else if (diffInMs < day) {
      return `${Math.floor(diffInMs / hour)}h`;
  } else if (diffInMs < week) {
      return `${Math.floor(diffInMs / day)}d`;
  } else if (diffInMs < month) {
      return `${Math.floor(diffInMs / week)}w`;
  } else if (diffInMs < year) {
      return `${Math.floor(diffInMs / month)}M`;
  } else {
      return `${Math.floor(diffInMs / year)}Y`;
  }
}




export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "dd MMMM yyyy  •  hh:mm a");
  return formattedDate;
};
