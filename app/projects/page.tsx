"use client";

import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { apiUrl } from "../../lib/api-url";
import { ProjectType } from "@/types/project.type";
import ProjectCard from "./project-card";
import { useState } from "react";
import PaginationControls from "../pagination-controls";

export default function ProjectsPage() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { data, error, isLoading } = useSWR(`${apiUrl}/project`, fetcher);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const projects: ProjectType[] = data;

  const pageChanged = (newPage: number) => {
    setOffset((newPage - 1) * limit);
  };

  const limitChanged = (newLimit: number) => {
    setLimit(newLimit);
    setOffset(0);
  };

  return (
    <div>
      <h1>Projects</h1>
      {projects.slice(offset, offset + limit).map((project) => (
        <ProjectCard key={project.Id} project={project} />
      ))}
      <PaginationControls
        offset={offset}
        limit={limit}
        count={projects.length}
        pageChanged={pageChanged}
        limitChanged={limitChanged}
      />
    </div>
  );
}
