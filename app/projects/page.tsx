"use client";

import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { apiUrl } from "../../lib/api-url";
import { ProjectType } from "@/types/project.type";
import ProjectCard from "./project-card";
import { useState } from "react";
import PaginationControls from "../pagination-controls";
import {
  UserSessionType,
  sessionKey,
  useSessionStorage,
} from "../../lib/session.storage";
import Link from "next/link";
import { FiPlusCircle, FiTool } from "react-icons/fi";
import LoadingIndicator from "../loading-indicator";

export default function ProjectsPage() {
  const { getItem } = useSessionStorage();
  const [session] = useState<UserSessionType>(getItem(sessionKey, "session"));
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { data, error, isLoading } = useSWR(`${apiUrl}/project`, fetcher);
  if (isLoading) return <LoadingIndicator />;
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
      <div className="flex flex-wrap">
        <span className="mt-1 mr-1">
          <FiTool size="1.5em" />
        </span>
        <h1>Projects</h1>
        {session.signedIn && (
          <Link href="/projects/new" className="ml-4 mt-1 flex">
            New Project
            <span className="ml-1 mt-1">
              <FiPlusCircle />
            </span>
          </Link>
        )}
      </div>

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
