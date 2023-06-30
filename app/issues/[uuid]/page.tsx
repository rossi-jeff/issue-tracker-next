"use client";

import { useParams } from "next/navigation";

export default function EditIssuePage() {
  const { uuid } = useParams();
  return (
    <div className="card">
      <h2>Edit Issue</h2>
      <div>{uuid}</div>
    </div>
  );
}
