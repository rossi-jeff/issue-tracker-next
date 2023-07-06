import { Metadata } from "next";
import UsersContent from "./users-content";

export const metadata: Metadata = {
  title: "Issue Tracker | Users",
};

export default function UsersPage() {
  return <UsersContent />;
}
