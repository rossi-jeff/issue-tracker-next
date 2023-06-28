"use client";

import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { apiUrl } from "../../lib/api-url";
import { ProjectType } from "@/types/project.type";
import ProjectCard from "./project-card";
import { useState } from "react";

export default function ProjectsPage() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { data, error, isLoading } = useSWR(`${apiUrl}/project`, fetcher);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const projects: ProjectType[] = data;

  return (
    <div>
      <h1>Projects</h1>
      {projects.slice(offset, offset + limit).map((project) => (
        <ProjectCard key={project.Id} project={project} />
      ))}
    </div>
  );
}
