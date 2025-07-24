export function formatDate(dateInput: Date | string | number) {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    console.error("Invalid date provided to formatDate:", dateInput);
    return "";
  }

  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  const time = `${hours}:${minutes} ${ampm}`;

  return `${day} ${month} ${year}, ${time}`;
}
