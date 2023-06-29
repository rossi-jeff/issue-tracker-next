"use client";

import useSWR from "swr";
import { apiUrl } from "../../lib/api-url";
import { fetcher } from "../../lib/fetcher";
import { IssueType } from "@/types/issue.type";
import IssueCard from "./issue-card";
import { useState } from "react";
import { UserType } from "@/types/user.type";
import IssueFilter from "./issue-filter";

export default function IssuesPage() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  let issues: IssueType[] = [];
  let users: UserType[] = [];

  const issueReq = useSWR(`${apiUrl}/issue`, fetcher);
  const userReq = useSWR(`${apiUrl}/user`, fetcher);

  if (issueReq.isLoading || userReq.isLoading) return <div>Loading...</div>;
  if (issueReq.error || userReq.error) return <div>Error</div>;

  issues = issueReq.data;
  users = userReq.data;

  return (
    <div>
      <h1>Issues</h1>
      <IssueFilter users={users} />
      {issues.slice(offset, offset + limit).map((issue) => (
        <IssueCard key={issue.Id} issue={issue} />
      ))}
    </div>
  );
}
