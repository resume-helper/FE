import { CombineZero } from "./combineZero";

export function DateFormat(time: string | Date) {
  const date = new Date(time);

  const year = date.getFullYear();
  const month = CombineZero(date.getMonth() + 1);
  const day = CombineZero(date.getDate());

  const result = `${year}.${month}.${day}`;

  console.log(result, "##");
  return result;
}
