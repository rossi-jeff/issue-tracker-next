"use client";

import { getFullName } from "@/lib/get-full-name";
import {
  UserSessionType,
  sessionKey,
  useSessionStorage,
} from "@/lib/session.storage";
import { IssueType } from "@/types/issue.type";
import Link from "next/link";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

export default function IssueCard({ issue }: { issue: IssueType }) {
  const { getItem } = useSessionStorage();
  const [session] = useState<UserSessionType>(getItem(sessionKey, "session"));
  const author = issue.Author ? getFullName(issue.Author) : "N/A";
  const assignedTo = issue.AssignedTo ? getFullName(issue.AssignedTo) : "N/A";
  return (
    <div className="card" id={"issue-" + issue.UUID}>
      <div className="flex flex-wrap">
        {session.signedIn && (
          <Link href={"/issues/" + issue.UUID} className="mr-2 mt-1">
            <FiEdit />
          </Link>
        )}
        <h2>{issue.SequenceNumber}</h2>
      </div>
      <div className="font-bold">{issue.Title}</div>
      {issue.Project && (
        <div>
          <strong className="mr-2">Project</strong>
          {issue.Project.Name}
        </div>
      )}
      <div className="flex flex-wrap justify-between">
        <div>
          <strong className="mr-2">Priority</strong>
          {issue.Priority}
        </div>
        <div>
          <strong className="mr-2">Status</strong>
          {issue.Status}
        </div>
        <div>
          <strong className="mr-2">Type</strong>
          {issue.Type}
        </div>
        <div>
          <strong className="mr-2">Complexity</strong>
          {issue.Complexity}
        </div>
      </div>
      <div className="my-1">{issue.Details}</div>
      <div className="flex flex-wrap justify-between">
        <div className="w-72">
          <strong className="mr-2">Created</strong>
          {issue.Created}
        </div>
        <div className="w-80">
          <strong className="mr-2">Author</strong>
          {author}
        </div>
        <div className="w-80">
          <strong className="mr-2">Assigned</strong>
          {assignedTo}
        </div>
      </div>
    </div>
  );
}
