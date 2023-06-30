"use client";

import { apiUrl } from "@/lib/api-url";
import { fetcher } from "@/lib/fetcher";
import { getFullName } from "@/lib/get-full-name";
import {
  ComplexityArray,
  IssueTypeArray,
  PriorityArray,
  StatusArray,
} from "@/types/array.types";
import { IssueType } from "@/types/issue.type";
import { ProjectType } from "@/types/project.type";
import { UserType } from "@/types/user.type";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function EditIssuePage() {
  const { uuid } = useParams();
  let issue: IssueType = {
    SequenceNumber: "",
    ProjectId: "",
    Title: "",
    Details: "",
    Priority: "",
    Status: "",
    Complexity: "",
    Type: "",
    AssignedToId: "",
  };
  let users: UserType[] = [];
  let projects: ProjectType[] = [];

  const issueReq = useSWR(uuid ? `${apiUrl}/issue/${uuid}` : null, fetcher);
  const userReq = useSWR(`${apiUrl}/user`, fetcher);
  const projectReq = useSWR(`${apiUrl}/project`, fetcher);
  if (issueReq.isLoading || userReq.isLoading || projectReq.isLoading)
    return <div>Loading...</div>;
  if (issueReq.error || userReq.error || projectReq.error)
    return <div>Error</div>;

  issue = issueReq.data;
  projects = projectReq.data;
  users = userReq.data;

  return (
    <div className="card">
      <h2>Edit Issue {issue.SequenceNumber}</h2>
      <div>
        <label htmlFor="ProjectId" className="block">
          Project
        </label>
        <select name="ProjectId" id="ProjectId" defaultValue={issue.ProjectId}>
          <option value="">- select -</option>
          {projects.map((p) => (
            <option key={p.UUID} value={p.Id}>
              {p.Sequence ? p.Sequence.Prefix : ""} | {p.Name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="Title" className="block">
          Title
        </label>
        <input
          type="text"
          name="Title"
          id="Title"
          className="w-full"
          defaultValue={issue.Title}
        />
      </div>
      <div>
        <label htmlFor="Details" className="block">
          Details
        </label>
        <textarea
          name="Details"
          id="Details"
          defaultValue={issue.Details}
          className="w-full h-20"
        ></textarea>
      </div>
      <div className="flex flex-wrap justify-between">
        <div>
          <label htmlFor="Priority" className="block">
            Priority
          </label>
          <select name="Priority" id="Priority" defaultValue={issue.Priority}>
            <option value="">- select -</option>
            {PriorityArray.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="Status" className="block">
            Status
          </label>
          <select name="Status" id="Status" defaultValue={issue.Status}>
            <option value="">- select -</option>
            {StatusArray.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="Type" className="block">
            Type
          </label>
          <select name="Type" id="Type" defaultValue={issue.Type}>
            <option value="">- select -</option>
            {IssueTypeArray.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="Complexity" className="block">
            Complexity
          </label>
          <select
            name="Complexity"
            id="Complexity"
            defaultValue={issue.Complexity}
          >
            <option value="">- select -</option>
            {ComplexityArray.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="AssignedToId" className="block">
          Assigned To
        </label>
        <select
          name="AssignedToId"
          id="AssignedToId"
          defaultValue={issue.AssignedToId}
        >
          <option value="">- select -</option>
          {users.map((u) => (
            <option key={u.UUID} value={u.Id}>
              {getFullName(u)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button>Update Issue</button>
      </div>
    </div>
  );
}
