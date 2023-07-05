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
import { useState } from "react";
import useSWR from "swr";
import { RemoveBlanks } from "../../../lib/remove-blanks";
import { buildHeaders } from "../../../lib/build-headers";
import {
  UserSessionType,
  sessionKey,
  useSessionStorage,
} from "../../../lib/session.storage";

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

  const { getItem } = useSessionStorage();
  const [session] = useState<UserSessionType>(getItem(sessionKey, "session"));
  const [modified, setModified] = useState(false);
  const [updates, setUpdates] = useState<IssueType>({
    SequenceNumber: "",
    ProjectId: "",
    Title: "",
    Details: "",
    Priority: "",
    Status: "",
    Complexity: "",
    Type: "",
    AssignedToId: "",
  });
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

  const fieldChanged = (ev: any) => {
    const { name, value } = ev.target;
    issueReq.mutate({
      ...issue,
      [name]: value,
    });
    setUpdates({
      ...updates,
      [name]: value,
    });
    setModified(true);
  };

  const updateIssue = async () => {
    const { UUID } = issue;
    const {
      ProjectId,
      Title,
      Details,
      Priority,
      Status,
      Type,
      Complexity,
      AssignedToId,
    } = updates;
    const payload = RemoveBlanks({
      ProjectId,
      Title,
      Details,
      Priority,
      Status,
      Type,
      Complexity,
      AssignedToId,
    });
    console.log({ payload });
    const result = await fetch(`${apiUrl}/issue/${UUID}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: buildHeaders(session),
    });
    if (result.ok) {
      setUpdates({
        SequenceNumber: "",
        ProjectId: "",
        Title: "",
        Details: "",
        Priority: "",
        Status: "",
        Complexity: "",
        Type: "",
        AssignedToId: "",
      });
      setModified(false);
    }
  };

  return (
    <div className="card">
      <h2>Edit Issue {issue.SequenceNumber}</h2>
      <div>
        <label htmlFor="ProjectId" className="block">
          Project
        </label>
        <select name="ProjectId" id="ProjectId" onChange={fieldChanged}>
          <option value="">- select -</option>
          {projects.map((p) => (
            <option
              key={p.UUID}
              value={p.Id}
              selected={String(p.Id) == issue.ProjectId}
            >
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
          onChange={fieldChanged}
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
          onChange={fieldChanged}
        ></textarea>
      </div>
      <div className="flex flex-wrap justify-between">
        <div>
          <label htmlFor="Priority" className="block">
            Priority
          </label>
          <select name="Priority" id="Priority" onChange={fieldChanged}>
            <option value="">- select -</option>
            {PriorityArray.map((p, i) => (
              <option key={i} value={p} selected={p == issue.Priority}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="Status" className="block">
            Status
          </label>
          <select name="Status" id="Status" onChange={fieldChanged}>
            <option value="">- select -</option>
            {StatusArray.map((s, i) => (
              <option key={i} value={s} selected={s == issue.Status}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="Type" className="block">
            Type
          </label>
          <select name="Type" id="Type" onChange={fieldChanged}>
            <option value="">- select -</option>
            {IssueTypeArray.map((t, i) => (
              <option key={i} value={t} selected={t == issue.Type}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="Complexity" className="block">
            Complexity
          </label>
          <select name="Complexity" id="Complexity" onChange={fieldChanged}>
            <option value="">- select -</option>
            {ComplexityArray.map((c, i) => (
              <option key={i} value={c} selected={c == issue.Complexity}>
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
        <select name="AssignedToId" id="AssignedToId" onChange={fieldChanged}>
          <option value="">- select -</option>
          {users.map((u) => (
            <option
              key={u.UUID}
              value={u.Id}
              selected={String(u.Id) == issue.AssignedToId}
            >
              {getFullName(u)}
            </option>
          ))}
        </select>
      </div>
      <div>
        {modified && <button onClick={updateIssue}>Update Issue</button>}
      </div>
    </div>
  );
}
