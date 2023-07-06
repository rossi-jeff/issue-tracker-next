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
import { useState } from "react";
import useSWR from "swr";
import {
  UserSessionType,
  sessionKey,
  useSessionStorage,
} from "../../../lib/session.storage";
import { buildHeaders } from "../../../lib/build-headers";
import { RemoveBlanks } from "../../../lib/remove-blanks";
import { FiList } from "react-icons/fi";

export default function NewIssuePage() {
  const { getItem } = useSessionStorage();
  const [session] = useState<UserSessionType>(getItem(sessionKey, "session"));
  const [issue, setIssue] = useState<IssueType>({
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
  let users: UserType[] = [];
  let projects: ProjectType[] = [];

  const userReq = useSWR(`${apiUrl}/user`, fetcher);
  const projectReq = useSWR(`${apiUrl}/project`, fetcher);
  if (userReq.isLoading || projectReq.isLoading) return <div>Loading...</div>;
  if (userReq.error || projectReq.error) return <div>Error</div>;

  projects = projectReq.data;
  users = userReq.data;

  const fieldChanged = (ev: any) => {
    const { name, value } = ev.target;
    setIssue({
      ...issue,
      [name]: value,
    });
  };

  const createIssue = async () => {
    const {
      ProjectId,
      Title,
      Details,
      Priority,
      Status,
      Type,
      Complexity,
      AssignedToId,
    } = issue;
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
    if (!ProjectId || !Title || !Details) return;
    const result = await fetch(`${apiUrl}/issue`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: buildHeaders(session),
    });
    if (result.ok) {
      setIssue({
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
    }
  };

  return (
    <div className="card">
      <div className="flex">
        <span className="mr-1">
          <FiList size="1.5em" />
        </span>
        <h2>New Issue</h2>
      </div>

      <div className="mb-4">
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
      <div className="mb-4">
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
      <div className="mb-4">
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
      <div className="flex flex-wrap justify-between mb-4">
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
      <div className="mb-4">
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
        <button onClick={createIssue}>Create Issue</button>
      </div>
    </div>
  );
}
