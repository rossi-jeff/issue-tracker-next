import { Metadata } from "next";
import IssueContent from "./issue-content";

export const metadata: Metadata = {
  title: "Issue Tracker | Issues",
};

export default function IssuesPage() {
  return <IssueContent />;
}
