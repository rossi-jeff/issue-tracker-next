"use client";

import { useParams } from "next/navigation";

export default function EditUserPage() {
  const { uuid } = useParams();
  return (
    <div className="card">
      <h2>Edit User</h2>
      <div>{uuid}</div>
    </div>
  );
}
