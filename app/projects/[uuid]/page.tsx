"use client";

import { useParams } from "next/navigation";

export default function EditProjectPage() {
  const { uuid } = useParams();
  return (
    <div className="card">
      <h2>Edit Project</h2>
      <div>{uuid}</div>
    </div>
  );
}
