import { parseISO, startOfDay, startOfToday, subDays } from "date-fns";
import { Activity } from "./types";

export const MILES_PER_METER = 0.000621371;

const MINUTES_PER_MILE_IN_METERS_PER_SECOND = 26.8224;

function mPerSecToMinPerMile(mPerSec: number): number {
  return MINUTES_PER_MILE_IN_METERS_PER_SECOND / mPerSec;
}

export type Unit = "miles" | "km" | "m";

function metersToMiles(meters: number): number {
  return MILES_PER_METER * meters;
}

function metersToKm(meters: number): number {
  return meters / 1000;
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

const minToMinSec = (minutesDecimal: number) => {
  const minutes = Math.floor(minutesDecimal);
  const seconds = Math.round((minutesDecimal - minutes) * 60);
  return [minutes.toString(), seconds.toString().padStart(2, "0")];
};
const formatMeterSpeed = (speed: number) => {
  const rounded = Utils.roundDistance(Utils.mPerSecToMinPerMile(speed));
  const [minutes, seconds] = Number.isNaN(rounded)
    ? []
    : Utils.minToMinSec(rounded);
  const formatted = minutes === undefined ? "-" : `${minutes}:${seconds}/mi`;
  return formatted;
};

export const Utils = {
  metersToMiles,
  metersToKm,
  roundDistance: toDecimal(2),
  groupByDay,
  getLastNDays,
  mPerSecToMinPerMile,
  minToMinSec,
  formatMeterSpeed,
};
