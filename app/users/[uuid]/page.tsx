"use client";

import { apiUrl } from "@/lib/api-url";
import { fetcher } from "@/lib/fetcher";
import { UserRoleArray } from "@/types/array.types";
import { UserType } from "@/types/user.type";
import { useParams } from "next/navigation";
import useSWR from "swr";
import PhoneList from "../phone-list";
import EmailList from "../email-list";

export default function EditUserPage() {
  const { uuid } = useParams();
  let user: UserType = {
    Credentials: {
      Username: "",
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
  const userReq = useSWR(uuid ? `${apiUrl}/user/${uuid}` : null, fetcher);
  if (userReq.isLoading) return <div>Loading...</div>;
  if (userReq.error) return <div>Error</div>;

  user = userReq.data;

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
      <h2>Edit User</h2>
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
