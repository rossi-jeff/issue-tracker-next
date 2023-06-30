"use client";

import { apiUrl } from "@/lib/api-url";
import { fetcher } from "@/lib/fetcher";
import { ProjectType } from "@/types/project.type";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function EditProjectPage() {
  const { uuid } = useParams();
  let project: ProjectType = {
    Name: "",
    Details: "",
  };
  const projectReq = useSWR(uuid ? `${apiUrl}/project/${uuid}` : null, fetcher);

  if (projectReq.isLoading) return <div>Loading</div>;
  if (projectReq.error) return <div>Error</div>;

  project = projectReq.data;
  return (
    <div className="card">
      <h2>Edit Project</h2>
      <div>
        <label htmlFor="Name" className="block">
          Name
        </label>
        <input
          type="text"
          name="Name"
          id="Name"
          className="w-full"
          defaultValue={project.Name}
        />
      </div>
      <div>
        <label htmlFor="Details" className="block">
          Details
        </label>
        <textarea
          name="Details"
          id="Details"
          defaultValue={project.Details}
          className="w-full h-20"
        ></textarea>
      </div>
      <div>
        <button>Update Project</button>
      </div>
    </div>
  );
}
