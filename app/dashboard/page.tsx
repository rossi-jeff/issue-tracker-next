import { Metadata } from "next";
import DashboardContent from "./dashboard-content";

export const metadata: Metadata = {
  title: "Issue Tracker | Dashboard",
};

export default function DashboardPage() {
  return <DashboardContent />;
}
