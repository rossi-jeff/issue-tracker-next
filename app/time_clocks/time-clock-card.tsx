"use client";

import { formatClock } from "@/lib/format-clock";
import { getFullName } from "@/lib/get-full-name";
import { getTimeClockHours } from "@/lib/get-time-clock-hours";
import {
  UserSessionType,
  sessionKey,
  useSessionStorage,
} from "@/lib/session.storage";
import { TimeClockType } from "@/types/time-clock.type";
import Link from "next/link";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

export default function TimeClockCard({
  timeClock,
}: {
  timeClock: TimeClockType;
}) {
  const { getItem } = useSessionStorage();
  const [session] = useState<UserSessionType>(getItem(sessionKey, "session"));
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
      <div className="flex flex-wrap">
        {session.signedIn && (
          <div className="w-8 pt-1">
            <Link href={"/time_clocks/" + timeClock.UUID}>
              <FiEdit />
            </Link>
          </div>
        )}
        <div className="flex-grow">
          <div className="flex flex-wrap justify-between">
            <div className="w-80">
              <strong className="mr-2">User</strong>
              {user}
            </div>
            <div className="w-96">
              <strong className="mr-2">Project</strong>
              {project}
            </div>
            <div className="w-32">
              <strong className="mr-2">Issue</strong>
              {issue}
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-80">
              <strong className="mr-2">From</strong>
              {from}
            </div>
            <div className="w-96">
              <strong className="mr-2">To</strong>
              {to}
            </div>
            <div className="w-32">
              <strong className="mr-2">Hours</strong>
              {hours}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
