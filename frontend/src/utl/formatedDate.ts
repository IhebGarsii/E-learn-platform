export function formatedDate(comentDate: Date): string {
  const date = new Date(comentDate);

  // Check if the date is valid
  const formattedDate = !isNaN(date.getTime())
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(date)
    : "Invalid date";
  return formattedDate;
}
