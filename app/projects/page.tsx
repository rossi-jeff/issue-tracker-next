import { Metadata } from "next";
import ProjectsContent from "./projects-content";

export const metadata: Metadata = {
  title: "Issue Tracker | Projects",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
