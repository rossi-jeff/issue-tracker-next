"use client";

import { apiUrl } from "@/lib/api-url";
import { fetcher } from "@/lib/fetcher";
import { getFullName } from "@/lib/get-full-name";
import { IssueType } from "@/types/issue.type";
import { ProjectType } from "@/types/project.type";
import { TimeClockType } from "@/types/time-clock.type";
import { UserType } from "@/types/user.type";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function EditTimeClockPage() {
  const { uuid } = useParams();
  let timeClock: TimeClockType = {
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
  };
  let issues: IssueType[] = [];
  let users: UserType[] = [];
  let projects: ProjectType[] = [];

  const clockReq = useSWR(uuid ? `${apiUrl}/timeclock/${uuid}` : null, fetcher);
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

  timeClock = clockReq.data;
  issues = issueReq.data;
  users = userReq.data;
  projects = projectReq.data;
  return (
    <div className="card">
      <h2>Edit Time Clock</h2>
      <div className="flex flex-wrap justify-between">
        <div>
          <label htmlFor="UserId" className="block">
            User
          </label>
          <select name="UserId" id="UserId" defaultValue={timeClock.UserId}>
            <option value="">- select -</option>
            {users.map((u) => (
              <option key={u.UUID} value={u.Id}>
                {getFullName(u)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ProjectId" className="block">
            Project
          </label>
          <select
            name="ProjectId"
            id="ProjectId"
            defaultValue={timeClock.ProjectId}
          >
            <option value="">- select -</option>
            {projects.map((p) => (
              <option key={p.UUID} value={p.Id}>
                {p.Sequence ? p.Sequence.Prefix : ""} | {p.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="IssueId" className="block">
            Issue
          </label>
          <select name="IssueId" id="IssueId" defaultValue={timeClock.IssueId}>
            <option value="">- select -</option>
            {issues.map((i) => (
              <option key={i.UUID} value={String(i.Id)}>
                {i.SequenceNumber} | {i.Title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <div>
          <label htmlFor="StartDate" className="block">
            Start Date
          </label>
          {timeClock.Start && (
            <input
              type="date"
              name="StartDate"
              id="StartDate"
              defaultValue={timeClock.Start.Date}
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
              name="StartTime"
              id="StartTime"
              defaultValue={timeClock.Start.Time}
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
              name="EndDate"
              id="EndDate"
              defaultValue={timeClock.End.Date}
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
              name="EndTime"
              id="EndTime"
              defaultValue={timeClock.End.Time}
            />
          )}
        </div>
      </div>
      <div>
        <button>Update Time Clock</button>
      </div>
    </div>
  );
}
