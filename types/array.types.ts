import { RoleType } from "./user.type";

export const ComplexityArray = ["1", "2", "3", "5", "8", "13", "21"];

export const IssueTypeArray = [
  "Bug",
  "Feature Request",
  "Customer Issue",
  "Internal Cleanup",
  "Improvement",
  "Process",
  "Vulnerability",
];

export const PriorityArray = [
  "Critical",
  "Urgent",
  "High",
  "Medium",
  "Low",
  "Ignore",
];

export const StatusArray = [
  "New",
  "Assigned",
  "Accepted",
  "Fixed",
  "Fixed (Verified)",
  "Won't Fix (Not reproducible)",
  "Won't Fix (Intended behavior)",
  "Won't Fix (Obsolete)",
  "Won't Fix (Infeasible)",
  "Duplicate",
];

export const OtherStatusArray = [
  "Fixed (Verified)",
  "Won't Fix (Not reproducible)",
  "Won't Fix (Intended behavior)",
  "Won't Fix (Obsolete)",
  "Won't Fix (Infeasible)",
  "Duplicate",
];

export const UserRoleArray: RoleType[] = [
  "Developer",
  "Support",
  "Manager",
  "Sales",
  "EndUser",
];

export const UsageArray = ["Personal", "Business"];

export const PhoneTypeArray = ["Cellular", "LandLine"];
