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
import PaginationControls from "../pagination-controls";
import { useRouter, useSearchParams } from "next/navigation";
import { useSwrWithQuery } from "../../lib/use-swr-with-query";
import {
  UserSessionType,
  sessionKey,
  useSessionStorage,
} from "../../lib/session.storage";
import Link from "next/link";

export default function TimeClocksPage() {
  const { getItem } = useSessionStorage();
  const [session] = useState<UserSessionType>(getItem(sessionKey, "session"));
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const router = useRouter();
  const search = useSearchParams();

  let timeClocks: TimeClockType[] = [];
  let issues: IssueType[] = [];
  let users: UserType[] = [];
  let projects: ProjectType[] = [];

  const clockReq = useSwrWithQuery("timeclock", search.toString());
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

  const pageChanged = (newPage: number) => {
    setOffset((newPage - 1) * limit);
  };

  const limitChanged = (newLimit: number) => {
    setLimit(newLimit);
    setOffset(0);
  };

  const filterTimeClocks = (params: { [key: string]: string }) => {
    const search = new URLSearchParams();
    for (const key in params) {
      search.append(key, params[key]);
    }
    const queryStr = search.toString();
    if (queryStr.length) {
      router.push(`/time_clocks?${queryStr}`);
    } else {
      router.push("/time_clocks");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap">
        <h1>Time Clocks</h1>
        {session.signedIn && (
          <Link href="/time_clocks/new" className="ml-4">
            New Time Clock
          </Link>
        )}
      </div>
      <TimeClockFilter
        users={users}
        projects={projects}
        issues={issues}
        filterTimeClocks={filterTimeClocks}
      />
      {timeClocks &&
        timeClocks.length &&
        timeClocks
          .slice(offset, offset + limit)
          .map((timeClock) => (
            <TimeClockCard key={timeClock.Id} timeClock={timeClock} />
          ))}
      <PaginationControls
        offset={offset}
        limit={limit}
        count={timeClocks.length}
        pageChanged={pageChanged}
        limitChanged={limitChanged}
      />
    </div>
  );
}
