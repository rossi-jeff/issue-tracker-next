import type { TimeClockType } from "../types/time-clock.type";

export const getTimeClockHours = (timeClock: TimeClockType) => {
  let hours = 0;
  if (
    timeClock.Start &&
    timeClock.Start.Date &&
    timeClock.Start.Time &&
    timeClock.End &&
    timeClock.End.Date &&
    timeClock.End.Time
  ) {
    const sDate = new Date(`${timeClock.Start.Date} ${timeClock.Start.Time}`);
    const eDate = new Date(`${timeClock.End.Date} ${timeClock.End.Time}`);
    if (sDate && eDate) {
      const ms = eDate.getTime() - sDate.getTime();
      hours = Math.round(ms / 36000) / 100;
    }
  }
  return hours.toFixed(2);
};
