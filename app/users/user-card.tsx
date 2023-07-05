"use client";

import { getFullName } from "@/lib/get-full-name";
import {
  UserSessionType,
  sessionKey,
  useSessionStorage,
} from "@/lib/session.storage";
import { UserType } from "@/types/user.type";
import Link from "next/link";
import { useState } from "react";

export default function UserCard({ user }: { user: UserType }) {
  const { getItem } = useSessionStorage();
  const [session] = useState<UserSessionType>(getItem(sessionKey, "session"));
  const name = getFullName(user);
  const userName = user.Credentials ? user.Credentials.Username : "N/A";
  return (
    <div className="card" id={"user-" + user.UUID}>
      <div className="flex flex-wrap">
        {session.signedIn && (
          <Link href={"/users/" + user.UUID} className="mr-4">
            Edit
          </Link>
        )}
        <h2>{userName}</h2>
      </div>
      <div>{name}</div>
    </div>
  );
}
