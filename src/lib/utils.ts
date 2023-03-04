import { parseISO, startOfDay, startOfToday, subDays } from "date-fns";
import { Activity } from "./types";

export const MILES_PER_METER = 0.000621371;

function metersToMiles(meters: number): number {
  return MILES_PER_METER * meters;
}

const toDecimal =
  (decimals = 2) =>
  (num: number) => {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
  };

const groupByDay = (activities: Activity[]) => {
  return activities.reduce((acc, activity) => {
    const date = parseISO(activity.start_date);
    const key = startOfDay(date).toDateString();
    if (!acc[key]) {
      acc[key] = [] as Activity[];
    }
    acc[key].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);
};

const getLastNDays = (n = 7) => {
  const today = startOfToday();
  return Array.from({ length: n }, (_, i) => subDays(today, i));
};

export const Utils = {
  metersToMiles,
  formatMiles: toDecimal(2),
  groupByDay,
  getLastNDays,
};
