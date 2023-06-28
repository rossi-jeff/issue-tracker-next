"use client";

import useSWR from "swr";
import { apiUrl } from "../../lib/api-url";
import { fetcher } from "../../lib/fetcher";
import { IssueType } from "@/types/issue.type";
import IssueCard from "./issue-card";
import { useEffect, useState } from "react";

export default function IssuesPage() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { data, error, isLoading } = useSWR(`${apiUrl}/issue`, fetcher);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const issues: IssueType[] = data;

  return (
    <div>
      <h1>Issues</h1>
      {issues.slice(offset, offset + limit).map((issue) => (
        <IssueCard key={issue.Id} issue={issue} />
      ))}
    </div>
  );
}
