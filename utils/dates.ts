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


export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "dd MMMM yyyy  •  hh:mm a");
  return formattedDate;
};
