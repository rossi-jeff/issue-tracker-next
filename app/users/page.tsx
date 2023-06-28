"use client";

import useSWR from "swr";
import { apiUrl } from "../../lib/api-url";
import { fetcher } from "../../lib/fetcher";
import { UserType } from "@/types/user.type";
import UserCard from "./user-card";
import { useState } from "react";

export default function UsersPage() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { data, error, isLoading } = useSWR(`${apiUrl}/user`, fetcher);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const users: UserType[] = data;
  return (
    <div>
      <h1>Users</h1>
      {users.slice(offset, offset + limit).map((user) => (
        <UserCard key={user.Id} user={user} />
      ))}
    </div>
  );
}
