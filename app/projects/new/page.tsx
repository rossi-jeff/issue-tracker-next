import { ProjectType } from "@/types/project.type";

export default function NewProjectPage() {
  let project: ProjectType = {
    Name: "",
    Details: "",
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
        <button>Create Project</button>
      </div>
    </div>
  );
}
