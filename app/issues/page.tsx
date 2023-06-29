"use client";

import useSWR from "swr";
import { apiUrl } from "../../lib/api-url";
import { fetcher } from "../../lib/fetcher";
import { IssueType } from "@/types/issue.type";
import IssueCard from "./issue-card";
import { useState } from "react";
import { UserType } from "@/types/user.type";
import IssueFilter from "./issue-filter";
import PaginationControls from "../pagination-controls";

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

  const pageChanged = (newPage: number) => {
    setOffset((newPage - 1) * limit);
  };

  const limitChanged = (newLimit: number) => {
    setLimit(newLimit);
    setOffset(0);
  };

  return (
    <div>
      <h1>Issues</h1>
      <IssueFilter users={users} />
      {issues.slice(offset, offset + limit).map((issue) => (
        <IssueCard key={issue.Id} issue={issue} />
      ))}
      <PaginationControls
        limit={limit}
        offset={offset}
        count={issues.length}
        pageChanged={pageChanged}
        limitChanged={limitChanged}
      />
    </div>
  );
}
