// YYYY-MM-DD → DD.MM.YYYY
export function formatDateToDMY(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}

// DD.MM.YYYY → Date
export function formatDMYToDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split(".").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDMYToDateInput(dmy: string): string {
  const [day, month, year] = dmy.split(".");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

// Current date
export function getToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
