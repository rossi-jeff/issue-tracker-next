import { Metadata } from "next";
import TimeClocksContent from "./time-clocks-content";

export const metadata: Metadata = {
  title: "Issue Tracker | Time Clocks",
};

export default function TimeClocksPage() {
  return <TimeClocksContent />;
}
