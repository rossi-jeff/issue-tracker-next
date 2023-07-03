"use client";

import { UserRoleArray } from "@/types/array.types";
import { UserType } from "@/types/user.type";
import PhoneList from "../phone-list";
import EmailList from "../email-list";
import { PhoneType } from "@/types/phone.type";
import { EmailType } from "@/types/email.type";
import { clone } from "../../../lib/clone";
import { useRef } from "react";

export default function NewUserPage() {
  const showPhones = useRef(true);
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
    console.log("createEmail", JSON.stringify(ev));
    if (!user.Emails) user.Emails = [];
    const { Address, Usage, Public } = ev;
    let email: EmailType = { Address, Usage, Public };
    email.UUID = crypto.randomUUID();
    user.Emails.push(email);
    // user = clone(user)
  };

  const updateEmail = (ev: {
    Address: string;
    Usage: string;
    Public: boolean;
    UUID: string;
  }) => {
    console.log("updateEmail", JSON.stringify(ev));
    if (!user.Emails) user.Emails = [];
    const { Address, Usage, Public, UUID } = ev;
    const idx = user.Emails.findIndex((e) => e.UUID == UUID);
    if (idx != -1) {
      const email = user.Emails[idx];
      user.Emails[idx] = { ...email, Address, Usage, Public };
      // user = clone(user)
    }
  };

  const deleteEmail = (UUID: string) => {
    console.log("deleteEmail", UUID);
    if (!user.Emails) user.Emails = [];
    const idx = user.Emails.findIndex((e) => e.UUID == UUID);
    if (idx != -1) {
      user.Emails.splice(idx, 1);
      // user = clone(user)
    }
  };

  const createPhone = (ev: {
    Number: string;
    Type: string;
    Usage: string;
    Public: boolean;
  }) => {
    showPhones.current = false;
    console.log("createPhone", JSON.stringify(ev));
    if (!user.Phones) user.Phones = [];
    const { Number, Type, Usage, Public } = ev;
    let phone: PhoneType = { Number, Type, Usage, Public };
    phone.UUID = crypto.randomUUID();
    user.Phones.push(phone);
    showPhones.current = true;
  };

  const updatePhone = (ev: {
    Number: string;
    Type: string;
    Usage: string;
    Public: boolean;
    UUID: string;
  }) => {
    showPhones.current = false;
    console.log("updatePhone", JSON.stringify(ev));
    if (!user.Phones) user.Phones = [];
    const { Number, Type, Usage, Public, UUID } = ev;
    const idx = user.Phones.findIndex((p) => p.UUID == UUID);
    if (idx != -1) {
      const phone = user.Phones[idx];
      user.Phones[idx] = { ...phone, Number, Type, Usage, Public };
      // user = clone(user)
    }
    showPhones.current = true;
  };

  const deletePhone = (UUID: string) => {
    showPhones.current = false;
    console.log("deletePhone", UUID);
    if (!user.Phones) user.Phones = [];
    const idx = user.Phones.findIndex((p) => p.UUID == UUID);
    if (idx != -1) {
      user.Phones.splice(idx, 1);
      // user = clone(user)
    }
    showPhones.current = true;
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
              defaultChecked={user.Roles && user.Roles.indexOf(role) > -1}
            />
            <label htmlFor={"role-" + role} className="ml-2">
              {role}
            </label>
          </div>
        ))}
      </div>
      {showPhones && (
        <PhoneList
          phones={user.Phones || []}
          createPhone={createPhone}
          updatePhone={updatePhone}
          deletePhone={deletePhone}
        />
      )}
      <EmailList
        emails={user.Emails || []}
        createEmail={createEmail}
        updateEmail={updateEmail}
        deleteEmail={deleteEmail}
      />
    </div>
  );
}
