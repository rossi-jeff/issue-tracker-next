"use client";

import { UserRoleArray } from "@/types/array.types";
import { UserType } from "@/types/user.type";
import PhoneList from "../phone-list";
import EmailList from "../email-list";

export default function NewUserPage() {
  let user: UserType = {
    Credentials: {
      Username: "",
      Password: "",
    },
    Name: {
      First: "",
      Middle: "",
      Last: "",
    },
    Roles: [],
    Phones: [],
    Emails: [],
  };

  const createEmail = (ev: {
    Address: string;
    Usage: string;
    Public: boolean;
  }) => {
    console.log(ev);
  };

  const updateEmail = (ev: {
    Address: string;
    Usage: string;
    Public: boolean;
    UUID: string;
  }) => {
    console.log(ev);
  };

  const deleteEmail = (uuid: string) => {
    console.log(uuid);
  };
  return (
    <div className="card">
      <h2>New User</h2>
      <div className="flex flex-wrap justify-between">
        <div>
          <label htmlFor="Username" className="block">
            Username
          </label>
          {user.Credentials && (
            <input
              type="text"
              name="Username"
              id="Username"
              defaultValue={user.Credentials.Username}
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <div>
          <label htmlFor="First" className="block">
            First
          </label>
          {user.Name && (
            <input
              type="text"
              name="First"
              id="First"
              defaultValue={user.Name.First}
            />
          )}
        </div>
        <div>
          <label htmlFor="Middle" className="block">
            Middle
          </label>
          {user.Name && (
            <input
              type="text"
              name="Middle"
              id="Middle"
              defaultValue={user.Name.Middle}
            />
          )}
        </div>
        <div>
          <label htmlFor="Last" className="block">
            Last
          </label>
          {user.Name && (
            <input
              type="text"
              name="Last"
              id="Last"
              defaultValue={user.Name.Last}
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        {UserRoleArray.map((role, idx) => (
          <div key={idx}>
            <input
              type="checkbox"
              name="role"
              id={"role-" + role}
              value={role}
              checked={user.Roles && user.Roles.indexOf(role) > -1}
            />
            <label htmlFor={"role-" + role} className="ml-2">
              {role}
            </label>
          </div>
        ))}
      </div>
      <PhoneList phones={user.Phones || []} />
      <EmailList
        emails={user.Emails || []}
        createEmail={createEmail}
        updateEmail={updateEmail}
        deleteEmail={deleteEmail}
      />
    </div>
  );
}
