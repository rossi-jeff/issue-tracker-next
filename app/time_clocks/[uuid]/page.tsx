"use client";

import { useParams } from "next/navigation";

export default function EditTimeClockPage() {
  const { uuid } = useParams();
  return (
    <div className="card">
      <h2>Edit Time Clock</h2>
      <div>{uuid}</div>
    </div>
  );
}
