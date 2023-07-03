import { apiUrl } from "@/lib/api-url";
import { buildHeaders } from "@/lib/build-headers";
import {
  UserSessionType,
  sessionKey,
  useSessionStorage,
} from "@/lib/session.storage";
import { ProjectType } from "@/types/project.type";
import { useState } from "react";

export default function NewProjectPage() {
  const { getItem } = useSessionStorage();
  const [session] = useState<UserSessionType>(getItem(sessionKey, "session"));
  const [project, setProject] = useState<ProjectType>({
    Name: "",
    Details: "",
  });

  const fieldChanged = (ev: any) => {
    const { name, value } = ev.target;
    setProject({
      ...project,
      [name]: value,
    });
  };

  const createProject = async () => {
    const { Name, Details } = project;
    if (!Name || !Details) return;
    const result = await fetch(`${apiUrl}/project`, {
      method: "POST",
      body: JSON.stringify({ Name, Details }),
      headers: buildHeaders(session),
    });
    if (result.ok) {
      setProject({
        Name: "",
        Details: "",
      });
    }
  };
  return (
    <div className="card">
      <h2>New Project</h2>
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
      <div>
        <button onClick={createProject}>Create Project</button>
      </div>
    </div>
  );
}
