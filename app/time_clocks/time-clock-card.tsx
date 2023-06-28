import { formatClock } from "@/lib/format-clock";
import { getFullName } from "@/lib/get-full-name";
import { getTimeClockHours } from "@/lib/get-time-clock-hours";
import { TimeClockType } from "@/types/time-clock.type";

export default function TimeClockCard({
  timeClock,
}: {
  timeClock: TimeClockType;
}) {
  const user = timeClock.User ? getFullName(timeClock.User) : "N/A";
  const project = timeClock.Project ? timeClock.Project.Name : "N/A";
  const issue = timeClock.Issue ? timeClock.Issue.SequenceNumber : "N/A";
  const from =
    timeClock.Start && timeClock.Start.Date && timeClock.Start.Time
      ? formatClock(timeClock.Start)
      : "N/A";
  const to =
    timeClock.End && timeClock.End.Date && timeClock.End.Time
      ? formatClock(timeClock.End)
      : "N/A";

  const hours = getTimeClockHours(timeClock);
  return (
    <div className="card" id={"time-clock-" + timeClock.UUID}>
      <div className="flex flex-wrap justify-between">
        <div>
          <strong>User</strong>
          {user}
        </div>
        <div>
          <strong>Project</strong>
          {project}
        </div>
        <div>
          <strong>Issue</strong>
          {issue}
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <div>
          <strong>From</strong>
          {from}
        </div>
        <div>
          <strong>To</strong>
          {to}
        </div>
        <div>
          <strong>Hours</strong>
          {hours}
        </div>
      </div>
    </div>
  );
}
