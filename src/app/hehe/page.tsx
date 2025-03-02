"use client";

import { TestFrame } from "@/app/hehe/h";
import { ParentElement } from "@/app/hehe/parent";
import { Button } from "@/components/ui/button";
import { Kanban } from "lucide-react";
import { useState } from "react";

export default function HehePage() {
  const Icon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
        />
      </svg>
    );
  };

  let text = "123123";

  const hanleOnClick = () => {
    console.log(text);
    text = "123";
    setH(!h);
  };

  const [h, setH] = useState(true);

  return (
    <div className="flex-1 flex flex-col">
      <ParentElement button={<Kanban className="size-5" />}>
        <TestFrame></TestFrame>
      </ParentElement>
      <Kanban className="size-5" />
      <Button onClick={hanleOnClick}>{text}</Button>
    </div>
  );
}
