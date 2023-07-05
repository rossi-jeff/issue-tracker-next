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
import { useRouter, useSearchParams } from "next/navigation";
import { useSwrWithQuery } from "../../lib/use-swr-with-query";
import {
  UserSessionType,
  sessionKey,
  useSessionStorage,
} from "../../lib/session.storage";
import Link from "next/link";

export default function IssuesPage() {
  const { getItem } = useSessionStorage();
  const [session] = useState<UserSessionType>(getItem(sessionKey, "session"));
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const router = useRouter();
  const search = useSearchParams();

  let issues: IssueType[] = [];
  let users: UserType[] = [];

  const issueReq = useSwrWithQuery("issue", search.toString());
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

  const filterIssues = async (params: { [key: string]: string }) => {
    const search = new URLSearchParams();
    for (const key in params) {
      search.append(key, params[key]);
    }
    const queryStr = search.toString();
    if (queryStr.length) {
      router.push(`/issues?${queryStr}`);
    } else {
      router.push("/issues");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap">
        <h1>Issues</h1>
        {session.signedIn && (
          <Link href="/issues/new" className="ml-4">
            New Issue
          </Link>
        )}
      </div>
      <IssueFilter users={users} filterIssues={filterIssues} />
      {issues &&
        issues.length &&
        issues
          .slice(offset, offset + limit)
          .map((issue) => <IssueCard key={issue.Id} issue={issue} />)}
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
