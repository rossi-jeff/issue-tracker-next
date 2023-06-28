import { ClockType } from "../types/clock.type";

export const formatClock = (clock: ClockType) => {
  return `${clock.Date} @ ${clock.Time}`;
};
