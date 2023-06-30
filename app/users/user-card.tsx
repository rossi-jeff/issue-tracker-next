import { getFullName } from "@/lib/get-full-name";
import { UserType } from "@/types/user.type";

export default function UserCard({ user }: { user: UserType }) {
  const name = getFullName(user);
  const userName = user.Credentials ? user.Credentials.Username : "N/A";
  return (
    <div className="card" id={"user-" + user.UUID}>
      <h2>{userName}</h2>
      <div>{name}</div>
    </div>
  );
}
