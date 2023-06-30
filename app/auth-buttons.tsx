"use client";

import { useState } from "react";
import {
  UserSessionType,
  sessionKey,
  useSessionStorage,
} from "../lib/session.storage";
import { useRouter } from "next/navigation";
import { CredentialsType } from "../types/credentials.type";
import { apiUrl } from "../lib/api-url";

export default function AuthButtons() {
  const router = useRouter();
  const { getItem, setItem, removeItem } = useSessionStorage();
  const [session, setSession] = useState<UserSessionType>(
    getItem(sessionKey, "session")
  );

  const signOut = () => {
    removeItem(sessionKey, "session");
    const item = getItem(sessionKey, "session");
    setSession(item);
    if (window) window.location.reload();
  };

  const [credentials, setCredentials] = useState<CredentialsType>({
    Username: session.UserName || "",
    Password: "",
  });

  const fieldChanged = (ev: any) => {
    const { name, value } = ev.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const signIn = async () => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const { Username, Password } = credentials;
    if (!Username || !Password) return;
    const result = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ Username, Password }),
      headers,
    });
    if (result.ok) {
      const { Name, SessionId, Token, UUID, UserName } = await result.json();
      const newSession: UserSessionType = {
        Name,
        SessionId,
        Token,
        UUID,
        UserName,
        signedIn: true,
      };
      setItem(sessionKey, newSession, "session");
      setSession(newSession);
      hideSignIn();
      router.push("/");
    }
  };

  const showSignIn = () => {
    const overlay = document.getElementById("sign-in-overlay");
    const dialog = document.getElementById("sign-in-dialog");
    if (overlay && dialog) {
      overlay.classList.add("open");
      dialog.classList.add("open");
    }
  };

  const hideSignIn = () => {
    const overlay = document.getElementById("sign-in-overlay");
    const dialog = document.getElementById("sign-in-dialog");
    if (overlay && dialog) {
      overlay.classList.remove("open");
      dialog.classList.remove("open");
    }
  };
  return (
    <div className="mx-4 flex flex-wrap">
      {session.signedIn && (
        <>
          <div className="mr-4">{session.UserName}</div>
          <button onClick={signOut}>Sign Out</button>
        </>
      )}
      {!session.signedIn && <button onClick={showSignIn}>Sign In</button>}
      <div className="modal-overlay" id="sign-in-overlay">
        <div className="modal-fit" id="sign-in-dialog">
          <h2>Sign In</h2>
          <div>
            <label htmlFor="Username" className="block">
              Username
            </label>
            <input
              type="text"
              name="Username"
              id="Username"
              onChange={fieldChanged}
              defaultValue={credentials.Username || ""}
            />
          </div>
          <div>
            <label htmlFor="Password" className="block">
              Password
            </label>
            <input
              type="password"
              name="Password"
              id="Password"
              onChange={fieldChanged}
            />
          </div>
          <div className="flex flex-wrap justify-between">
            <button onClick={hideSignIn}>Cancel</button>
            <button onClick={signIn}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}
