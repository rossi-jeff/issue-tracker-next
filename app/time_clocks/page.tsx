"use client";

import useSWR from "swr";
import { apiUrl } from "../../lib/api-url";
import { fetcher } from "../../lib/fetcher";
import { TimeClockType } from "@/types/time-clock.type";
import TimeClockCard from "./time-clock-card";
import { useState } from "react";
import { IssueType } from "@/types/issue.type";
import { UserType } from "@/types/user.type";
import { ProjectType } from "@/types/project.type";
import TimeClockFilter from "./time-clock-filter";

export default function TimeClocksPage() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  let timeClocks: TimeClockType[] = [];
  let issues: IssueType[] = [];
  let users: UserType[] = [];
  let projects: ProjectType[] = [];

  const clockReq = useSWR(`${apiUrl}/timeclock`, fetcher);
  const issueReq = useSWR(`${apiUrl}/issue`, fetcher);
  const userReq = useSWR(`${apiUrl}/user`, fetcher);
  const projectReq = useSWR(`${apiUrl}/project`, fetcher);

  if (
    clockReq.isLoading ||
    userReq.isLoading ||
    issueReq.isLoading ||
    projectReq.isLoading
  )
    return <div>Loading...</div>;
  if (clockReq.error || userReq.error || issueReq.error || projectReq.error)
    return <div>Error</div>;

  timeClocks = clockReq.data;
  issues = issueReq.data;
  users = userReq.data;
  projects = projectReq.data;
  return (
    <div>
      <h1>Time Clocks</h1>
      <TimeClockFilter users={users} projects={projects} issues={issues} />
      {timeClocks.slice(offset, offset + limit).map((timeClock) => (
        <TimeClockCard key={timeClock.Id} timeClock={timeClock} />
      ))}
    </div>
  );
}
