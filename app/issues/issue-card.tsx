import { getFullName } from "@/lib/get-full-name";
import { IssueType } from "@/types/issue.type";

export default function IssueCard({ issue }: { issue: IssueType }) {
  const author = issue.Author ? getFullName(issue.Author) : "N/A";
  const assignedTo = issue.AssignedTo ? getFullName(issue.AssignedTo) : "N/A";
  return (
    <div className="card" id={"issue-" + issue.UUID}>
      <h2>{issue.SequenceNumber}</h2>
      <div>{issue.Title}</div>
      {issue.Project && (
        <div>
          <strong>Project</strong>
          {issue.Project.Name}
        </div>
      )}
      <div className="flex flex-wrap justify-between">
        <div>
          <strong>Priority</strong>
          {issue.Priority}
        </div>
        <div>
          <strong>Status</strong>
          {issue.Status}
        </div>
        <div>
          <strong>Type</strong>
          {issue.Type}
        </div>
        <div>
          <strong>Complexity</strong>
          {issue.Complexity}
        </div>
      </div>
      <div>{issue.Details}</div>
      <div className="flex flex-wrap justify-between">
        <div>
          <strong>Created</strong>
          {issue.Created}
        </div>
        <div>
          <strong>Author</strong>
          {author}
        </div>
        <div>
          <strong>Assigned</strong>
          {assignedTo}
        </div>
      </div>
    </div>
  );
}
