import { CombineZero } from "./combineZero";

export function DateFormat(time: string | Date, type: string) {
  const date = new Date(time);

  const year = date.getFullYear();
  const month = CombineZero(date.getMonth() + 1);
  const day = CombineZero(date.getDate());

  switch (type) {
    case "yyyy-mm":
      return `${year}.${month}`;
    case "yyyy-mm-dd":
      return `${year}.${month}.${day}`;

    default:
      return "-";
  }
}
