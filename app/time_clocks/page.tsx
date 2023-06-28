"use client";

import useSWR from "swr";
import { apiUrl } from "../../lib/api-url";
import { fetcher } from "../../lib/fetcher";
import { TimeClockType } from "@/types/time-clock.type";
import TimeClockCard from "./time-clock-card";
import { useState } from "react";

export default function TimeClocksPage() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  
  const { data, error, isLoading } = useSWR(`${apiUrl}/timeclock`, fetcher);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const timeClocks: TimeClockType[] = data;
  return (
    <div>
      <h1>Time Clocks</h1>
      {timeClocks.slice(offset,offset+limit).map((timeClock) => (
        <TimeClockCard key={timeClock.Id} timeClock={timeClock} />
      ))}
    </div>
  );
}
