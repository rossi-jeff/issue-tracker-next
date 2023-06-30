import { ProjectType } from "@/types/project.type";

export default function ProjectCard({ project }: { project: ProjectType }) {
  return (
    <div className="card" id={"project-" + project.UUID}>
      <h2>{project.Name}</h2>
      <div>{project.Details}</div>
    </div>
  );
}
