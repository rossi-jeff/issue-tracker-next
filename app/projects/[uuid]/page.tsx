"use client";

import LoadingIndicator from "@/app/loading-indicator";
import { apiUrl } from "@/lib/api-url";
import { buildHeaders } from "@/lib/build-headers";
import { fetcher } from "@/lib/fetcher";
import { RemoveBlanks } from "@/lib/remove-blanks";
import {
  UserSessionType,
  sessionKey,
  useSessionStorage,
} from "@/lib/session.storage";
import { ProjectType } from "@/types/project.type";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export default function EditProjectPage() {
  const { uuid } = useParams();
  const { getItem } = useSessionStorage();
  const [session] = useState<UserSessionType>(getItem(sessionKey, "session"));
  const [modified, setModified] = useState(false);
  const [updates, setUpdates] = useState<ProjectType>({
    Name: "",
    Details: "",
  });
  let project: ProjectType = {
    Name: "",
    Details: "",
  };
  const projectReq = useSWR(uuid ? `${apiUrl}/project/${uuid}` : null, fetcher);

  if (projectReq.isLoading) return <LoadingIndicator />;
  if (projectReq.error) return <div>Error</div>;

  project = projectReq.data;

  const fieldChanged = (ev: any) => {
    const { name, value } = ev.target;
    setUpdates({
      ...updates,
      [name]: value,
    });
    setModified(true);
  };

  const updateProject = async () => {
    const { UUID } = project;
    const { Name, Details } = updates;
    const payload = RemoveBlanks({ Name, Details });
    const result = await fetch(`${apiUrl}/project/${UUID}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: buildHeaders(session),
    });
    if (result.ok) {
      const data = await result.json();
      projectReq.mutate(data);
      setModified(false);
    }
  };
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
          onChange={fieldChanged}
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
          onChange={fieldChanged}
        ></textarea>
      </div>
      {modified && (
        <div>
          <button onClick={updateProject}>Update Project</button>
        </div>
      )}
    </div>
  );
}
