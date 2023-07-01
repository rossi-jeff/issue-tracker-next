import { PhoneType } from "@/types/phone.type";

export default function PhoneList({ phones }: { phones: PhoneType[] }) {
  return (
    <div>
      <h3>Phones</h3>
      {phones.map((phone) => (
        <div key={phone.Id} className="flex flex-wrap justify-between">
          <div>{phone.Number}</div>
          <div>{phone.Type}</div>
          <div>{phone.Usage}</div>
          <div>{phone.Public ? "Yes" : "No"}</div>
        </div>
      ))}
    </div>
  );
}
