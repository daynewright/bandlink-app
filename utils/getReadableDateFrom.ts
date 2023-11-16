import { differenceInDays, parseISO, formatDistance, format } from "date-fns";

const getReadableDateFrom = (dateString: string) => {
  // Parse the date string
  const parsedDate = parseISO(dateString);

  // Calculate the difference in days
  const daysDifference = differenceInDays(new Date(), parsedDate);

  // Format the distance for a more human-readable version
  const readableDistance = formatDistance(parsedDate, new Date(), {
    addSuffix: true,
  });

  return {
    readableDistance,
    daysDifference,
    readableDate: format(parsedDate, "EEE, MMM dd @ h:mm a"),
    readableTime: format(parsedDate, "h:mm a"),
  };
};

export default getReadableDateFrom;
