import { getFullName } from "@/lib/get-full-name";
import {
  ComplexityArray,
  IssueTypeArray,
  PriorityArray,
  StatusArray,
} from "@/types/array.types";
import { UserType } from "@/types/user.type";

export default function IssueFilter({ users }: { users: UserType[] }) {
  const toggle = () => {
    const el = document.getElementById("issue-filter-content");
    if (el) el.classList.toggle("open");
  };
  return (
    <div className="card" id="issue-filter">
      <button onClick={toggle}>Filter</button>
      <div className="filter-content" id="issue-filter-content">
        <div className="flex flex-wrap justify-between">
          <div>
            <label htmlFor="Priority">Priority</label>
            <select name="Priority">
              <option value="">- select -</option>
              {PriorityArray.map((p, i) => (
                <option key={i} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="Status">Status</label>
            <select name="Status">
              <option value="">- select -</option>
              {StatusArray.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="Type">Type</label>
            <select name="Type">
              <option value="">- select -</option>
              {IssueTypeArray.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="Complexity">Complexity</label>
            <select name="Complexity">
              <option value="">- select -</option>
              {ComplexityArray.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="Author">Author</label>
            <select name="Author">
              <option value="">- select -</option>
              {users.map((u) => (
                <option key={u.UUID} value={u.Id}>
                  {getFullName(u)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="Assigned">Assigned To</label>
            <select name="Assigned">
              <option value="Assigned">- select -</option>
              {users.map((u) => (
                <option key={u.UUID} value={u.Id}>
                  {getFullName(u)}
                </option>
              ))}
            </select>
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
