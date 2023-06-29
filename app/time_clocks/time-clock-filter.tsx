import { getFullName } from "@/lib/get-full-name";
import { IssueType } from "@/types/issue.type";
import { ProjectType } from "@/types/project.type";
import { UserType } from "@/types/user.type";

export default function TimeClockFilter({
  users,
  projects,
  issues,
}: {
  users: UserType[];
  projects: ProjectType[];
  issues: IssueType[];
}) {
  const toggle = () => {
    const el = document.getElementById("time-clock-filter-content");
    if (el) el.classList.toggle("open");
  };
  return (
    <div className="card" id="time-clock-filter">
      <button onClick={toggle}>Filter</button>
      <div className="filter-content" id="time-clock-filter-content">
        <div className="flex flex-wrap justify-between">
          <div>
            <label htmlFor="User">User</label>
            <select name="User">
              <option value="">- select -</option>
              {users.map((u) => (
                <option key={u.UUID} value={u.Id}>
                  {getFullName(u)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="Project">Project</label>
            <select name="Project">
              <option value="">- select -</option>
              {projects.map((p) => (
                <option key={p.UUID} value={p.Id}>
                  {p.Sequence ? p.Sequence.Prefix : "N/A"} | {p.Name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="Issue">Issue</label>
            <select name="Issue">
              <option value="">- select -</option>
              {issues.map((i) => (
                <option key={i.UUID} value={i.Id}>
                  {i.SequenceNumber} | {i.Title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div>
            <label htmlFor="StartDate">Start Date</label>
            <input type="date" name="StartDate" />
          </div>
          <div>
            <label htmlFor="EndDate">End Date</label>
            <input type="date" name="EndDate" />
          </div>
          <div>
            <label>&nbsp;</label>
            <button>Clear Filters</button>
          </div>
        </div>
      </div>
    </div>
  );
}
