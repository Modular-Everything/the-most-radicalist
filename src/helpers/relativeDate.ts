import { formatDistanceToNowStrict } from "date-fns";

export function relativeDate(date: string) {
  return date && formatDistanceToNowStrict(new Date(date), { addSuffix: true });
}
