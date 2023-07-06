"use client";

import { apiUrl } from "@/lib/api-url";
import { buildHeaders } from "@/lib/build-headers";
import { fetcher } from "@/lib/fetcher";
import { getFullName } from "@/lib/get-full-name";
import {
  UserSessionType,
  sessionKey,
  useSessionStorage,
} from "@/lib/session.storage";
import { IssueType } from "@/types/issue.type";
import { ProjectType } from "@/types/project.type";
import { TimeClockType } from "@/types/time-clock.type";
import { UserType } from "@/types/user.type";
import { useState } from "react";
import { FiClock } from "react-icons/fi";
import useSWR from "swr";

export default function NewTimeClockContent() {
  const { getItem } = useSessionStorage();
  const [session] = useState<UserSessionType>(getItem(sessionKey, "session"));
  const [timeClock, setTimeClock] = useState<TimeClockType>({
    Start: {
      Date: "",
      Time: "",
    },
    End: {
      Date: "",
      Time: "",
    },
    ProjectId: "",
    IssueId: "",
    UserId: "",
  });
  let issues: IssueType[] = [];
  let users: UserType[] = [];
  let projects: ProjectType[] = [];

  const issueReq = useSWR(`${apiUrl}/issue`, fetcher);
  const userReq = useSWR(`${apiUrl}/user`, fetcher);
  const projectReq = useSWR(`${apiUrl}/project`, fetcher);

  if (userReq.isLoading || issueReq.isLoading || projectReq.isLoading)
    return <div>Loading...</div>;
  if (userReq.error || issueReq.error || projectReq.error)
    return <div>Error</div>;

  issues = issueReq.data;
  users = userReq.data;
  projects = projectReq.data;

  const selectChanged = (ev: any) => {
    const { name, value } = ev.target;
    setTimeClock({
      ...timeClock,
      [name]: value,
    });
  };

  const startChanged = (ev: any) => {
    const { name, value } = ev.target;
    const { Start } = timeClock;
    const newStart = {
      ...Start,
      [name]: value,
    };
    console.log("startChanged", name, value);
    setTimeClock({
      ...timeClock,
      Start: newStart,
    });
  };

  const endChanged = (ev: any) => {
    const { name, value } = ev.target;
    const { End } = timeClock;
    const newEnd = {
      ...End,
      [name]: value,
    };
    console.log("endChanged", name, value);
    setTimeClock({
      ...timeClock,
      End: newEnd,
    });
  };

  const createTimeClock = async () => {
    const { Start, End, ProjectId, UserId, IssueId } = timeClock;
    if (!ProjectId || !UserId || !IssueId) return;
    const payload: any = { ProjectId, UserId, IssueId };
    if (Start.Date && Start.Time) payload.Start = Start;
    if (End.Date && End.Time) payload.End = End;
    console.log({ payload });
    const result = await fetch(`${apiUrl}/timeclock`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: buildHeaders(session),
    });
    if (result.ok) {
      setTimeClock({
        Start: {
          Date: "",
          Time: "",
        },
        End: {
          Date: "",
          Time: "",
        },
        ProjectId: "",
        IssueId: "",
        UserId: "",
      });
    }
  };
  return (
    <div className="card">
      <div className="flex">
        <span className="mr-1">
          <FiClock size="1.5em" />
        </span>
        <h2>New Time Clock</h2>
      </div>
      <div className="flex flex-wrap justify-between mb-4">
        <div>
          <label htmlFor="UserId" className="block">
            User
          </label>
          <select name="UserId" id="UserId" onChange={selectChanged}>
            <option value="">- select -</option>
            {users.map((u) => (
              <option
                key={u.UUID}
                value={u.Id}
                selected={String(u.Id) == timeClock.UserId}
              >
                {getFullName(u)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ProjectId" className="block">
            Project
          </label>
          <select name="ProjectId" id="ProjectId" onChange={selectChanged}>
            <option value="">- select -</option>
            {projects.map((p) => (
              <option
                key={p.UUID}
                value={p.Id}
                selected={String(p.Id) == timeClock.ProjectId}
              >
                {p.Sequence ? p.Sequence.Prefix : ""} | {p.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="IssueId" className="block">
            Issue
          </label>
          <select name="IssueId" id="IssueId" onChange={selectChanged}>
            <option value="">- select -</option>
            {issues.map((i) => (
              <option
                key={i.UUID}
                value={String(i.Id)}
                selected={String(i.Id) == timeClock.IssueId}
              >
                {i.SequenceNumber} | {i.Title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap justify-between mb-4">
        <div>
          <label htmlFor="StartDate" className="block">
            Start Date
          </label>
          {timeClock.Start && (
            <input
              type="date"
              name="Date"
              id="StartDate"
              value={timeClock.Start.Date}
              onChange={startChanged}
            />
          )}
        </div>
        <div>
          <label htmlFor="StartTime" className="block">
            Start Time
          </label>
          {timeClock.Start && (
            <input
              type="time"
              name="Time"
              id="StartTime"
              value={timeClock.Start.Time}
              onChange={startChanged}
            />
          )}
        </div>
        <div>
          <label htmlFor="EndDate" className="block">
            End Date
          </label>
          {timeClock.End && (
            <input
              type="date"
              name="Date"
              id="EndDate"
              value={timeClock.End.Date}
              onChange={endChanged}
            />
          )}
        </div>
        <div>
          <label htmlFor="EndTime" className="block">
            End Time
          </label>
          {timeClock.End && (
            <input
              type="time"
              name="Time"
              id="EndTime"
              value={timeClock.End.Time}
              onChange={endChanged}
            />
          )}
        </div>
      </div>
      <div>
        <button onClick={createTimeClock}>Create Time Clock</button>
      </div>
    </div>
  );
}
